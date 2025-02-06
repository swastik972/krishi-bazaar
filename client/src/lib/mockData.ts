import { Product } from "@shared/schema";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Carrots",
    category: "vegetables",
    description: "Fresh organic carrots perfect for restaurants and catering",
    imageUrl: "https://images.unsplash.com/photo-1620987278429-ab178d6eb547",
    pricePerKg: 2,
    minQuantity: 10,
    available: true,
  },
  {
    id: 2,
    name: "Premium Apples",
    category: "fruits",
    description: "Crisp and sweet apples sourced directly from local orchards",
    imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908",
    pricePerKg: 3,
    minQuantity: 20,
    available: true,
  },
];

export const partnerServices = [
  // Farmer Services
  {
    id: 1,
    title: "Bulk Seed & Equipment Supply",
    description: "Quality seeds and modern farming equipment for optimal yield",
    icon: "🌱",
    category: "farmer",
  },
  {
    id: 2,
    title: "Water & Irrigation Solutions",
    description: "Smart irrigation systems for efficient water management",
    icon: "💧",
    category: "farmer",
  },
  {
    id: 3,
    title: "Market Price & Demand Analytics",
    description: "Real-time market insights and demand forecasting",
    icon: "📈",
    category: "farmer",
  },
  {
    id: 4,
    title: "Weather & Climate Forecasting",
    description: "Accurate weather predictions for better crop planning",
    icon: "🌦",
    category: "farmer",
  },
  {
    id: 5,
    title: "Smart Crop Planning",
    description: "AI-powered crop planning for maximum yield",
    icon: "🌾",
    category: "farmer",
  },
  {
    id: 6,
    title: "Pest & Disease Management",
    description: "Integrated solutions for crop protection",
    icon: "🦟",
    category: "farmer",
  },
  {
    id: 7,
    title: "Government Schemes & Subsidies",
    description: "Stay updated with latest agricultural policies",
    icon: "📜",
    category: "farmer",
  },
  // Business Buyer Services
  {
    id: 8,
    title: "Expense & Profit Tracking",
    description: "Comprehensive financial management tools",
    icon: "💰",
    category: "business",
  },
  {
    id: 9,
    title: "Logistics Optimization",
    description: "Streamlined supply chain solutions",
    icon: "🏪",
    category: "business",
  },
  {
    id: 10,
    title: "Vendor Matching Services",
    description: "Connect with verified suppliers",
    icon: "🔍",
    category: "business",
  },
  {
    id: 11,
    title: "Wholesale Bulk Purchase",
    description: "Exclusive bulk buying options",
    icon: "🏢",
    category: "business",
  },
  {
    id: 12,
    title: "Real-Time Inventory & Pricing",
    description: "Live stock levels and dynamic pricing",
    icon: "📊",
    category: "business",
  },
];