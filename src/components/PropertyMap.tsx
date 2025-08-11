"use client";
import { GoogleMap, Marker, TrafficLayer, TransitLayer, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

type Props = { lat: number; lng: number };

export default function PropertyMap({ lat, lng }: Props) {
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  // Avoid touching global `google` before the JS API is loaded.
  const [mapTypeId, setMapTypeId] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">("roadmap");
  const [showTraffic, setShowTraffic] = useState(false);
  const [showTransit, setShowTransit] = useState(false);
  const [tiltOn, setTiltOn] = useState(false);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // set baseline view if supported (ignore in non-webgl)
    try { map.setTilt(0); } catch { /* no-op */ }
    try { map.setHeading(0); } catch { /* no-op */ }
  }, []);

  const rotate = (delta: number) => {
    const map = mapRef.current; if (!map) return;
    try {
      const current = (map.getHeading?.() || 0) as number;
      map.setHeading((current + delta + 360) % 360);
    } catch { /* no-op */ }
  };

  const toggle3D = () => {
    const map = mapRef.current; if (!map) return;
    try {
      const next = !tiltOn;
      map.setTilt(next ? 65 : 0);
      setTiltOn(next);
    } catch { /* no-op */ }
  };

  if (!isLoaded) return <div className="h-72 bg-slate-100 rounded-lg animate-pulse" />;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button className="btn btn-secondary btn-sm" onClick={()=>setMapTypeId("roadmap")}>Roadmap</button>
        <button className="btn btn-secondary btn-sm" onClick={()=>setMapTypeId("satellite")}>Satellite</button>
        <button className="btn btn-secondary btn-sm" onClick={()=>setMapTypeId("hybrid")}>Hybrid</button>
        <button className="btn btn-secondary btn-sm" onClick={()=>setMapTypeId("terrain")}>Terrain</button>
        <span className="h-5 w-px bg-slate-200" />
        <button className={`btn btn-secondary btn-sm ${tiltOn ? "border-[var(--brand-primary)]" : ""}`} onClick={toggle3D}>3D Tilt</button>
        <button className="btn btn-secondary btn-sm" onClick={()=>rotate(-30)}>↺ Rotate</button>
        <button className="btn btn-secondary btn-sm" onClick={()=>rotate(30)}>↻ Rotate</button>
        <span className="h-5 w-px bg-slate-200" />
        <button className={`btn btn-secondary btn-sm ${showTraffic ? "border-[var(--brand-primary)]" : ""}`} onClick={()=>setShowTraffic(v=>!v)}>Traffic</button>
        <button className={`btn btn-secondary btn-sm ${showTransit ? "border-[var(--brand-primary)]" : ""}`} onClick={()=>setShowTransit(v=>!v)}>Transit</button>
        <a className="btn btn-secondary btn-sm" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${lat},${lng}`}>Open in Google Maps</a>
      </div>
      <div className="h-72 rounded-lg overflow-hidden">
        <GoogleMap
          onLoad={onLoad}
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            mapId: mapId,
            mapTypeId: mapTypeId as google.maps.MapTypeId,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            mapTypeControl: false,
            gestureHandling: "greedy",
          }}
        >
          <Marker position={center} />
          {showTraffic && <TrafficLayer />}
          {showTransit && <TransitLayer />}
        </GoogleMap>
      </div>
    </div>
  );
}


