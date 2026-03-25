export const SERVICE_CATEGORIES = [
  { id: "ENGINE", label: "Engine & Mechanical", icon: "⚙️" },
  { id: "HULL", label: "Hull & Structure", icon: "🚢" },
  { id: "ELECTRICAL", label: "Electrical Systems", icon: "⚡" },
  { id: "NAVIGATION", label: "Navigation & Electronics", icon: "🧭" },
  { id: "SAFETY", label: "Safety Equipment", icon: "🛟" },
  { id: "INTERIOR", label: "Interior & Upholstery", icon: "🛋️" },
  { id: "DETAILING", label: "Detailing & Cleaning", icon: "✨" },
  { id: "RIGGING", label: "Rigging & Sails", icon: "⛵" },
  { id: "PLUMBING", label: "Plumbing & Sanitation", icon: "🔧" },
  { id: "PAINTING", label: "Painting & Antifouling", icon: "🎨" },
] as const;

export const COMPONENT_CATEGORIES = [
  {
    id: "ENGINE",
    label: "Engine",
    description: "Main engine & drive systems",
    icon: "⚙️",
    color: "navy",
  },
  {
    id: "HULL",
    label: "Hull",
    description: "Hull structure & running gear",
    icon: "🚢",
    color: "ocean",
  },
  {
    id: "ELECTRICAL",
    label: "Electrical",
    description: "Batteries, wiring & shore power",
    icon: "⚡",
    color: "gold",
  },
  {
    id: "NAVIGATION",
    label: "Navigation",
    description: "Chartplotter, radar & instruments",
    icon: "🧭",
    color: "teal",
  },
  {
    id: "SAFETY",
    label: "Safety",
    description: "Life rafts, flares & fire systems",
    icon: "🛟",
    color: "ocean",
  },
  {
    id: "INTERIOR",
    label: "Interior",
    description: "Upholstery, appliances & AC",
    icon: "🛋️",
    color: "navy",
  },
] as const;

export const REQUEST_STATUSES = [
  { id: "PENDING", label: "Pending", color: "gold" },
  { id: "QUOTED", label: "Quoted", color: "ocean" },
  { id: "ACCEPTED", label: "Accepted", color: "teal" },
  { id: "IN_PROGRESS", label: "In Progress", color: "navy" },
  { id: "COMPLETED", label: "Completed", color: "teal" },
  { id: "CANCELLED", label: "Cancelled", color: "gray" },
] as const;

export const DOCUMENT_TYPES = [
  { id: "REGISTRATION", label: "Registration" },
  { id: "INSURANCE", label: "Insurance" },
  { id: "SURVEY", label: "Survey" },
  { id: "SERVICE_RECORD", label: "Service Record" },
  { id: "MANUAL", label: "Manual" },
  { id: "CERTIFICATE", label: "Certificate" },
  { id: "OTHER", label: "Other" },
] as const;

export const URGENCY_LEVELS = [
  { id: "LOW", label: "Low", color: "green" },
  { id: "NORMAL", label: "Normal", color: "blue" },
  { id: "HIGH", label: "High", color: "orange" },
  { id: "EMERGENCY", label: "Emergency", color: "red" },
] as const;

export const PRIORITY_LEVELS = [
  { id: "LOW", label: "Low" },
  { id: "MEDIUM", label: "Medium" },
  { id: "HIGH", label: "High" },
  { id: "CRITICAL", label: "Critical" },
] as const;

export const HULL_TYPES = [
  "Monohull",
  "Catamaran",
  "Trimaran",
  "Pontoon",
  "Inflatable",
  "Other",
];

export const ENGINE_TYPES = [
  "Inboard Diesel",
  "Inboard Gasoline",
  "Outboard",
  "Electric",
  "Sail",
  "Other",
];

export const STATS = [
  { value: "12,400+", label: "Boats Managed" },
  { value: "3,200+", label: "Service Providers" },
  { value: "$2.1B+", label: "Fleet Value Protected" },
  { value: "98%", label: "Owner Satisfaction" },
];

export const OWNER_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/boats", label: "My Fleet", icon: "Sailboat" },
  { href: "/marketplace", label: "Marketplace", icon: "Store" },
  { href: "/requests", label: "Service Requests", icon: "ClipboardList" },
  { href: "/documents", label: "Documents", icon: "FolderOpen" },
  { href: "/messages", label: "Messages", icon: "MessageSquare" },
];

export const PROVIDER_NAV_ITEMS = [
  { href: "/provider/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/provider/requests", label: "Requests", icon: "ClipboardList" },
  { href: "/provider/profile", label: "My Profile", icon: "User" },
  { href: "/messages", label: "Messages", icon: "MessageSquare" },
];
