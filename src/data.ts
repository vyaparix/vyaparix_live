import { FeatureItem, IndustryItem, TestimonialItem, FAQItem } from "./types";

export const TRUSTED_BUSINESSES = [
  "Retail Stores",
  "Wholesalers",
  "Hardware Businesses",
  "Grocery Stores",
  "Electronics Shops",
  "Garment Stores",
];

export const TRUST_STATS = [
  { value: "10,000+", label: "Invoices Generated Daily" },
  { value: "99.9%", label: "Invoicing Accuracy" },
  { value: "24/7", label: "Anytime Business Access" },
  { value: "30%", label: "Average Profit Increase" },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    title: "GST Billing",
    description: "Vyaparix is the best GST billing software for Indian businesses. Generate GST-compliant tax invoices in under 5 seconds with automatic CGST, SGST, IGST, and HSN code calculations. Supports composition billing, credit notes, and debit notes for complete GST compliance.",
    iconName: "ReceiptText",
    badge: "GST compliant",
  },
  {
    title: "Inventory Management",
    description: "Powerful inventory management software that tracks stock values in real-time. Manage item details, groupings, barcode scanning, and automatic average purchase price calculations. Get instant stock valuation reports for your entire business.",
    iconName: "Boxes",
    badge: "Real-time",
  },
  {
    title: "Purchase Management",
    description: "Record purchases, manage cash and credit supplier bills, and track business expenses seamlessly. Stock balances update automatically when purchases are received, making this the ideal purchase management software for Indian shops.",
    iconName: "ShoppingCart",
  },
  {
    title: "Customer Ledger",
    description: "Maintain a clean digital khata (ledger) for every customer. Track udhaar credit balances, view transaction histories, and send automated balance due reminders via WhatsApp. The best khata software for Indian retail businesses.",
    iconName: "Users",
  },
  {
    title: "Supplier Ledger",
    description: "Track outstanding supplier accounts, historical purchase ledgers, and manage payments with integrated payout notes. Never miss a supplier payment deadline with automated reminders and complete ledger transparency.",
    iconName: "Building2",
  },
  {
    title: "WhatsApp Automation",
    description: "Send professional GST invoices, estimates, and payment link notifications directly to your customer's WhatsApp in one click. Eliminate expensive SMS gateways and improve payment collection with automated WhatsApp invoicing.",
    iconName: "MessageCircle",
    badge: "Hot feature",
  },
  {
    title: "Sales Reports",
    description: "Generate comprehensive business reports including daybooks, profit and loss statements, GST summary reports, and top-selling item analysis. Export all reports to ready-to-use Excel sheets for your CA.",
    iconName: "TrendingUp",
  },
  {
    title: "Stock Alerts",
    description: "Never run out of high-demand inventory items. Get instant stock alerts and auto-generated reorder lists when inventory falls below critical levels. Essential stock management software feature for busy retail shops.",
    iconName: "BellRing",
  },
  {
    title: "Cloud Backup",
    description: "Automatically back up your entire business database to Google Drive. Restore your data onto any Windows machine in minutes with military-grade encryption. Your business data is always safe and accessible.",
    iconName: "CloudLightning",
    badge: "Google Drive synced",
  },
  {
    title: "Invoice Printing",
    description: "Print professional invoices on A4 and A5 size pages in both portrait and landscape orientations. Full support for 2-inch and 3-inch thermal POS printers. The complete invoice printing software for Indian retail counters.",
    iconName: "Printer",
  },
  {
    title: "Business Analytics",
    description: "Gain deep business insights with customizable visual dashboards. View tax summaries, top 10 selling items, cash flow analysis, customer balances, and inventory trends. Make data-driven decisions for your business growth.",
    iconName: "BarChart3",
  },
  {
    title: "Custom Branding",
    description: "Upload your business logo, choose custom themes and colors, add digital signatures, and configure payment terms. Present a professional branded invoice to every customer with Vyaparix's customization options.",
    iconName: "Award",
  },
  {
    title: "Dashboard Overview",
    description: "Your complete business command center. View real-time sales summaries, outstanding customer balances, low stock warnings, and daily transaction snapshots all on one clean, intuitive dashboard layout.",
    iconName: "LayoutDashboard",
  },
  {
    title: "Billing Studio",
    description: "Vyaparix's powerful billing workspace where you create, preview, and print GST invoices in seconds. Access customer ledger, apply discounts, manage items, and send WhatsApp invoices from a single unified billing interface.",
    iconName: "FileText",
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    name: "Retail",
    description: "Supermarkets, apparel showrooms, general stores, and boutiques seeking fast item lookups and efficient retail billing software.",
    benefits: [
      "Ultra-fast POS billing with quick item lookup and barcode scanning support",
      "Item sizing and color matrix configurations for apparel and footwear",
      "Custom discounts, customer loyalty points, and scheme integration",
    ],
    iconName: "Store",
  },

  {
    name: "Grocery",
    description: "Kirana shops, bulk food marts, and dry fruit retail outlets needing flexible weight-based billing and inventory tracking.",
    benefits: [
      "Flexible weight units support (Kg, Grams, Liters, Packets, Pieces)",
      "Instant inventory valuation and mass price revision for all items",
      "Bulk barcode label printing for locally packed grains and staples",
    ],
    iconName: "ShoppingBag",
  },
  {
    name: "Electronics",
    description: "Mobile shops, consumer durables showrooms, and computer accessory retailers requiring serial number and warranty tracking.",
    benefits: [
      "Serial number and IMEI identification for every electronic item",
      "Warranty tracking and service status ledger for customer support",
      "Multi-warehouse and shop counter sync for chain stores",
    ],
    iconName: "Laptop",
  },
  {
    name: "Garments",
    description: "Apparel boutiques, fabric wholesalers, and footwear outlets requiring variant-based inventory management and style tracking.",
    benefits: [
      "Custom grouping by brand, size, fabric type, and style",
      "Print individual hang-tag pricing labels directly from the software",
      "Detailed visual reporting of slow-moving styles and fast sellers",
    ],
    iconName: "Shirt",
  },
  {
    name: "Hardware",
    description: "Paints, steel material yards, sanitary ware, and electrical showrooms handling diverse units and complex billing requirements.",
    benefits: [
      "Simultaneous double-unit billing support (e.g., Box and Pieces)",
      "Supplier ledger adjustments for broken, damaged, or returned items",
      "Transport delivery challans and E-way bill generation",
    ],
    iconName: "Wrench",
  },

  {
    name: "Wholesale",
    description: "B2B wholesale distributors and stockists handling massive transaction volumes with bulk pricing and credit management.",
    benefits: [
      "Custom bulk price books and volume discount schemes for B2B clients",
      "Strict customer credit limits with automated payment aging reports",
      "Consolidated transport dispatch bills and E-way bill integration",
    ],
    iconName: "Truck",
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: "What is Vyaparix and how does it help my business?",
    answer: "Vyaparix is India's smartest modern billing, inventory, and GST accounting software designed specifically for MSMEs, wholesalers, retailers, and distributors. It simplifies GST invoice creation, tracks stock balances in real-time, automates khata ledger entries, sends invoice links on WhatsApp, and generates GST reports effortlessly.",
  },
  {
    question: "Do I need an active internet connection to use Vyaparix?",
    answer: "No, Vyaparix is structured around an offline-first architecture. It works flawlessly without the internet on your Windows desktop. All sales, stocks, and billing are done locally on your device for unmatched speed. If you choose to enable the cloud backup feature, it will sync securely to your Google Drive whenever an active internet connection is detected.",
  },
  {
    question: "Is Vyaparix compliant with Indian GST laws?",
    answer: "Absolutely! Vyaparix is 100% compliant with general Indian GST regulations. It supports generating Tax Invoices, Bill of Supply, Composition Invoices, Credit Notes, and Debit Notes. It also generates automatic GST summary Excel sheets that can be shared with your CA.",
  },
  {
    question: "How does the WhatsApp invoicing feature work?",
    answer: "Once an invoice is saved, you can click the WhatsApp icon. Vyaparix uses active browser automation hooks or official API endpoints to send a highly personalized text message along with a PDF copy link of the invoice, directly to the customer's mobile number, bypassing expensive SMS gateways.",
  },
  {
    question: "What printers are supported by Vyaparix?",
    answer: "We support nearly all printers out of the box. For regular paperwork, you can use any A4 or A5 laser/inkjet printer. For retail checkout counters, Vyaparix supports all 2-inch and 3-inch thermal POS roll printers, generating neat and fast receipts.",
  },
  {
    question: "Is there a limit on the number of products, clients, or invoices I can manage?",
    answer: "No! Unlike most online billing services, Vyaparix does not charge you based on transaction volumes. You get unlimited invoices, unlimited products, unlimited customers, and unlimited suppliers with zero restrictions.",
  },
  {
    question: "What are the payment options? Is there a One Time Purchase available?",
    answer: "Yes! We believe in respecting traditional Indian business values. Alongside our low-cost annual plans, we offer a lifetime 'One Time Purchase' license for Vyaparix. This ensures you can access the product forever without any monthly subscription pressure. You get software updates and client support included.",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: "Rajesh Patel",
    role: "Owner, Patel Kirana Mart",
    businessName: "Grocery Store, Ahmedabad",
    rating: 5,
    text: "Switched to Vyaparix for our kirana store and it completely transformed how we manage daily billing. The barcode scanning and real-time stock updates save us hours every day. WhatsApp invoices to customers have improved our payment collection by 40%. Best billing software in India!",
  },
  {
    id: 2,
    name: "Sunita Sharma",
    role: "Manager, Fashion Hub Boutique",
    businessName: "Apparel Outlet, Mumbai",
    rating: 5,
    text: "Managing multiple dress size variants used to be a nightmare on spreadsheets. Vyaparix custom sizing matrices let us list stocks easily. With quick item lookup, the checkout flows instantly. Standard WhatsApp invoices mean customers love sharing bills!",
  },
  {
    id: 3,
    name: "Jaspreet Singh",
    role: "Managing Partner, J.S. Hardwares",
    businessName: "Hardware & Sanitary, Amritsar",
    rating: 5,
    text: "Double-unit billing in Vyaparix is outstanding. We sell paints by Litres and rods by Weight or Pieces, and Vyaparix adjusts both perfectly. Automated supplier dues tracking saved us endless ledger crosschecking. Highly recommend the one-time purchase option!",
  },
  {
    id: 4,
    name: "Anil Kulkarni",
    role: "Owner, Kulkarni Electronics",
    businessName: "Smart Electronics Shop, Pune",
    rating: 5,
    text: "Brilliant serial and IMEI tracking. For electronic devices, tracing warranty was very clumsy, but with Vyaparix we just enter the serial number and print the invoice. Tax calculation is 100% accurate, helping our CA complete GST filings in minutes.",
  },
];
