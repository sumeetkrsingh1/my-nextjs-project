export type Property = {
  id: string;
  title: string;
  location: string;
  price: number; // price in NGN
  monthlyRent?: number; // for rent properties
  beds: number;
  baths: number;
  sqft: number;
  type: "rent" | "sale" | "rto";
  image: string;
  coords?: { lat: number; lng: number };
  rto?: {
    monthly: number;
    years: number;
    equityRate: number; // percent per year
    purchasePrice: number;
  };
  // Extended fields for detailed comparison
  yearBuilt: number;
  propertyType: "Single Family" | "Condo" | "Townhouse" | "Apartment" | "Multi-Family";
  lotSize?: number; // in sqft
  parking: string;
  heating: string;
  cooling: string;
  flooring: string[];
  schools: {
    elementary: string;
    middle: string;
    high: string;
    rating: number; // out of 10
  };
  neighborhood: {
    walkScore: number; // out of 100
    transitScore: number; // out of 100
    bikeScore: number; // out of 100
  };
  utilities: {
    electric: number; // avg monthly
    gas: number;
    water: number;
    internet: number;
  };
  taxes: {
    annual: number;
    rate: number; // percentage
  };
  hoa?: {
    monthly: number;
    amenities: string[];
  };
  investment: {
    capRate?: number; // percentage
    rentYield?: number; // percentage
    appreciation?: number; // 5-year avg percentage
  };
  safety: {
    crimeRate: "Low" | "Medium" | "High";
    fireStation: number; // miles away
    hospital: number; // miles away
  };
  features: string[];
  condition: "New" | "Excellent" | "Good" | "Fair" | "Needs Work";
  pricePerSqft: number;
};

export type FinanceStats = {
  properties: number;
  customers: number;
  cities: number;
  agents: number;
  amountFinanced: number; // NGN
  usersServed: number;
  successRate: number; // 0..1
  interestRate: number; // percent
};

export const demoFinanceStats: FinanceStats = {
  properties: 12500,
  customers: 8200,
  cities: 120,
  agents: 450,
  amountFinanced: 50_000_000,
  usersServed: 2000,
  successRate: 0.95,
  interestRate: 3.5,
};

export const demoProperties: Property[] = [
  {
    id: "p-1001",
    title: "Modern 3BR Apartment",
    location: "Lekki Phase 1, Lagos",
    price: 25000000,
    beds: 3,
    baths: 3,
    sqft: 1500,
    type: "rto",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    coords: { lat: 6.4498, lng: 3.5363 },
    rto: { monthly: 180000, years: 5, equityRate: 0.15, purchasePrice: 25000000 },
    yearBuilt: 2018,
    propertyType: "Apartment",
    lotSize: 2000,
    parking: "2 Car Garage",
    heating: "Central Gas",
    cooling: "Central AC",
    flooring: ["Hardwood", "Tile"],
    schools: {
      elementary: "Lekki British International School",
      middle: "Corona Secondary School",
      high: "Chrisland College",
      rating: 8.5
    },
    neighborhood: {
      walkScore: 75,
      transitScore: 60,
      bikeScore: 40
    },
    utilities: {
      electric: 35000,
      gas: 15000,
      water: 8000,
      internet: 12000
    },
    taxes: {
      annual: 180000,
      rate: 0.72
    },
    hoa: {
      monthly: 25000,
      amenities: ["Pool", "Gym", "Security", "Generator"]
    },
    investment: {
      capRate: 4.2,
      rentYield: 7.2,
      appreciation: 8.5
    },
    safety: {
      crimeRate: "Low",
      fireStation: 1.2,
      hospital: 0.8
    },
    features: ["Swimming Pool", "Gym", "24/7 Security", "Generator", "Elevator", "Balcony"],
    condition: "Excellent",
    pricePerSqft: 16667
  },
  {
    id: "p-1002",
    title: "Cozy 2BR Condo",
    location: "VI, Lagos",
    price: 18000000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "rto",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    coords: { lat: 6.4333, lng: 3.4219 },
    rto: { monthly: 125000, years: 7, equityRate: 0.12, purchasePrice: 18000000 },
    yearBuilt: 2015,
    propertyType: "Condo",
    lotSize: 1500,
    parking: "1 Car Space",
    heating: "Electric",
    cooling: "Split AC Units",
    flooring: ["Ceramic Tile", "Carpet"],
    schools: {
      elementary: "Victoria Island Primary",
      middle: "Kings College",
      high: "Lagos Business School",
      rating: 9.0
    },
    neighborhood: {
      walkScore: 85,
      transitScore: 70,
      bikeScore: 50
    },
    utilities: {
      electric: 28000,
      gas: 10000,
      water: 6000,
      internet: 10000
    },
    taxes: {
      annual: 126000,
      rate: 0.70
    },
    hoa: {
      monthly: 18000,
      amenities: ["Security", "Generator", "Water Treatment"]
    },
    investment: {
      capRate: 3.8,
      rentYield: 6.8,
      appreciation: 9.2
    },
    safety: {
      crimeRate: "Low",
      fireStation: 0.5,
      hospital: 0.3
    },
    features: ["Ocean View", "24/7 Security", "Generator", "Water Treatment", "Parking"],
    condition: "Good",
    pricePerSqft: 16364
  },
  {
    id: "p-1003",
    title: "Luxury 4BR Duplex",
    location: "Ikoyi, Lagos",
    price: 32000000,
    beds: 4,
    baths: 4,
    sqft: 2400,
    type: "rto",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    coords: { lat: 6.4549, lng: 3.4336 },
    rto: { monthly: 350000, years: 3, equityRate: 0.2, purchasePrice: 32000000 },
    yearBuilt: 2020,
    propertyType: "Single Family",
    lotSize: 3500,
    parking: "3 Car Garage + 2 Guest",
    heating: "Central Gas",
    cooling: "Central AC + Smart Controls",
    flooring: ["Marble", "Hardwood", "Premium Tile"],
    schools: {
      elementary: "Ikoyi International School",
      middle: "Lagos Preparatory School", 
      high: "American International School",
      rating: 9.5
    },
    neighborhood: {
      walkScore: 60,
      transitScore: 45,
      bikeScore: 30
    },
    utilities: {
      electric: 45000,
      gas: 20000,
      water: 12000,
      internet: 18000
    },
    taxes: {
      annual: 256000,
      rate: 0.80
    },
    hoa: {
      monthly: 35000,
      amenities: ["Private Beach", "Golf Course", "Club House", "Tennis Court", "Spa"]
    },
    investment: {
      capRate: 5.2,
      rentYield: 8.8,
      appreciation: 12.1
    },
    safety: {
      crimeRate: "Low",
      fireStation: 0.8,
      hospital: 0.5
    },
    features: ["Private Pool", "Home Theater", "Wine Cellar", "Smart Home", "Garden", "Staff Quarters"],
    condition: "New",
    pricePerSqft: 13333
  },
  {
    id: "p-2001",
    title: "Starter 2BR Home",
    location: "Yaba, Lagos",
    price: 15000000,
    beds: 2,
    baths: 2,
    sqft: 1000,
    type: "sale",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop",
    coords: { lat: 6.5170, lng: 3.3903 },
    yearBuilt: 2012,
    propertyType: "Townhouse",
    lotSize: 1200,
    parking: "1 Car Port",
    heating: "None",
    cooling: "Window AC Units",
    flooring: ["Concrete", "Tile"],
    schools: {
      elementary: "Yaba Primary School",
      middle: "Yaba College of Technology",
      high: "University of Lagos Secondary",
      rating: 7.0
    },
    neighborhood: {
      walkScore: 70,
      transitScore: 80,
      bikeScore: 60
    },
    utilities: {
      electric: 22000,
      gas: 8000,
      water: 5000,
      internet: 8000
    },
    taxes: {
      annual: 90000,
      rate: 0.60
    },
    investment: {
      capRate: 6.5,
      rentYield: 9.2,
      appreciation: 7.8
    },
    safety: {
      crimeRate: "Medium",
      fireStation: 2.0,
      hospital: 1.5
    },
    features: ["Compound", "Water Storage", "Generator Space"],
    condition: "Good",
    pricePerSqft: 15000
  },
  {
    id: "p-3001",
    title: "City Studio",
    location: "Ikeja, Lagos",
    price: 0,
    monthlyRent: 250000,
    beds: 1,
    baths: 1,
    sqft: 550,
    type: "rent",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    coords: { lat: 6.6018, lng: 3.3515 },
    yearBuilt: 2019,
    propertyType: "Apartment",
    parking: "Shared Parking",
    heating: "None",
    cooling: "Split AC",
    flooring: ["Laminate", "Tile"],
    schools: {
      elementary: "Ikeja Primary School",
      middle: "Ikeja Junior High",
      high: "Ikeja Senior High",
      rating: 6.5
    },
    neighborhood: {
      walkScore: 90,
      transitScore: 85,
      bikeScore: 70
    },
    utilities: {
      electric: 18000,
      gas: 5000,
      water: 4000,
      internet: 8000
    },
    taxes: {
      annual: 0,
      rate: 0
    },
    hoa: {
      monthly: 12000,
      amenities: ["Security", "Generator", "Elevator"]
    },
    investment: {
      rentYield: 18.2
    },
    safety: {
      crimeRate: "Medium",
      fireStation: 1.8,
      hospital: 1.2
    },
    features: ["Modern Kitchen", "High-Speed Internet", "Security", "Generator"],
    condition: "Excellent",
    pricePerSqft: 455
  },
];

export type LoanProgram = {
  key: string;
  friendly: string;
  downPayment: string;
  creditScore: string;
  maxAmount: string;
  interestRate: string;
  terms: string;
};

export const loanTypes: LoanProgram[] = [
  {
    key: "Conventional",
    friendly: "Standard bank mortgage",
    downPayment: "5-20%",
    creditScore: "680+",
    maxAmount: "₦80M",
    interestRate: "3.5-5.5%",
    terms: "15-30 years",
  },
  {
    key: "FHA",
    friendly: "Government-backed for lower down payments",
    downPayment: "3.5%",
    creditScore: "620+",
    maxAmount: "₦50M",
    interestRate: "3.0-5.0%",
    terms: "15-30 years",
  },
  {
    key: "VA",
    friendly: "For veterans/military with 0% down",
    downPayment: "0%",
    creditScore: "640+",
    maxAmount: "₦60M",
    interestRate: "2.9-4.2%",
    terms: "15-30 years",
  },
  {
    key: "Jumbo",
    friendly: "For high-priced homes beyond standard limits",
    downPayment: "20%+",
    creditScore: "720+",
    maxAmount: "₦200M",
    interestRate: "4.0-6.0%",
    terms: "15-30 years",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRatePercent: number,
  termYears: number,
  taxYearly: number,
  insuranceYearly: number,
  pmiMonthly: number
) {
  const principal = Math.max(homePrice - downPayment, 0);
  const monthlyRate = annualRatePercent / 100 / 12;
  const n = termYears * 12;
  let principalAndInterest = 0;
  if (monthlyRate === 0) {
    principalAndInterest = principal / n;
  } else {
    principalAndInterest =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);
  }
  const taxMonthly = taxYearly / 12;
  const insuranceMonthly = insuranceYearly / 12;
  const totalMonthly =
    principalAndInterest + taxMonthly + insuranceMonthly + pmiMonthly;
  return {
    principalAndInterest,
    taxMonthly,
    insuranceMonthly,
    pmiMonthly,
    totalMonthly,
  };
}


