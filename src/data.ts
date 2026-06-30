import { FeatureItem, IndustryItem, TestimonialItem, FAQItem } from "./types";

export const TRUSTED_BUSINESSES = [
  "Retail Stores",
  "Wholesalers",
  "Hardware Businesses",
  "Medical Stores",
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
    description: "Generate beautiful, GST-compliant tax invoices in less than 5 seconds. Supports CGST, SGST,HSN  and composition billing schemes.",
    iconName: "ReceiptText",
    badge: "GST compliant",
  },
  {
    title: "Inventory Management",
    description: "Track physical stock values in real-time. Manage item details, grouping, and automatically calculate average purchase prices.",
    iconName: "Boxes",
    badge: "Real-time",
  },
  {
    title: "Purchase Management",
    description: "Record purchases, manage cash/credit supplier bills, track expenses, and automatically update stock balances on receiving items.",
    iconName: "ShoppingCart",
  },
  {
    title: "Customer Ledger",
    description: "Maintain a clean, digital khata. Track credit balances (udhaar), transaction histories, and send automated balance dues instantly.",
    iconName: "Users",
  },
  {
    title: "Supplier Ledger",
    description: "Track outstanding supplier accounts, historical purchase ledgers, and manage payments with integrated payout notes.",
    iconName: "Building2",
  },
  {
    title: "WhatsApp Automation",
    description: "Send professional invoices, estimates, and automatic payment link notifications straight to your customer's WhatsApp in one click.",
    iconName: "MessageCircle",
    badge: "Hot feature",
  },
  {
    title: "Sales Reports",
    description: "Generate comprehensive business statements, daybooks, profit & loss tables, GST summary data in ready Excel sheets.",
    iconName: "TrendingUp",
  },
  {
    title: "Stock Alerts",
    description: "Never run out of high-demand items. Get instant notifications and reorder list summaries when stock falls below critical levels.",
    iconName: "BellRing",
  },
  {
    title: "Cloud Backup",
    description: "Host database backups on Google Drive automatically. Restore business data safely onto any machine in minutes with high encryption.",
    iconName: "CloudLightning",
    badge: "Google Drive synced",
  },
  {
    title: "Invoice Printing",
    description: "Print professional invoices on A4 size pages in both portrait and landscape orientation. Also supports thermal roll paper.",
    iconName: "Printer",
  },
  {
    title: "Business Analytics",
    description: "Gain deep insights with customizable visual dashboards showing tax summaries, top10-selling items, cash flow, and client balances.",
    iconName: "BarChart3",
  },
  {
    title: "Custom Branding",
    description: "Upload your business logo, choose custom themes and colors, append digital signatures, terms & conditions, and payment method settings.",
    iconName: "Award",
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    name: "Retail",
    description: "Supermarkets, apparel showrooms, general stores, and boutiques seeking fast item lookups.",
    benefits: [
      "Ultra-fast POS billing with quick item lookup support",
      "Item sizing and color matrix configurations",
      "Custom discounts, customer loyalty points integration",
    ],
    iconName: "Store",
  },
  {
    name: "Medical",
    description: "Pharmacies, drugstores, and medical distributors with strict statutory drug license tracing.",
    benefits: [
      "Batch-wise inventory with clear manufacturing & expiry date logs",
      "Auto-alerts for expiring chemicals and drugs",
      "Easy GST reports for pharmaceutical products",
    ],
    iconName: "Stethoscope",
  },
  {
    name: "Grocery",
    description: "Kirana shops, bulk food marts, and dry fruit retail outlets seeking item weight pairing.",
    benefits: [
      "Flexible weight units (Kg, Grams, Liters, Packets)",
      "Instant inventory valuation and mass price revision",
      "Bulk label printing for locally packed grains",
    ],
    iconName: "ShoppingBag",
  },
  {
    name: "Electronics",
    description: "Mobile shops, consumer durables showrooms, and computer accessory retailers.",
    benefits: [
      "Serial number and IMEI identification for each item",
      "Warranty tracking and service status ledgering",
      "Multiple warehouse / shop counter sync features",
    ],
    iconName: "Laptop",
  },
  {
    name: "Garments",
    description: "Apparel boutiques, fabric wholesalers, and footwear outlets requiring variant management.",
    benefits: [
      "Custom grouping by brand, size, brand fabric, or style",
      "Print individual hang-tag pricing labels directly",
      "Detailed visual reporting of slow-moving styles",
    ],
    iconName: "Shirt",
  },
  {
    name: "Hardware",
    description: "Paints, steel material yards, sanitary ware, and electrical showrooms handling diverse units.",
    benefits: [
      "Simultaneous double-unit billing (e.g. Box and Pcs)",
      "Supplier ledger adjustments for broken/damaged returns",
      "Easy transport delivery chalans & E-way bills",
    ],
    iconName: "Wrench",
  },
  {
    name: "Restaurant",
    description: "Cafes, bakeries, fast-food counters, and fine dining outlets managing orders.",
    benefits: [
      "Quick Kitchen Order Tickets (KOT) printouts",
      "Dynamic GST split (5% vs 18% based on items)",
      "Payment mode recording on every invoice",
    ],
    iconName: "Utensils",
  },
  {
    name: "Wholesale",
    description: "B2B wholesale distributors and stockists handling massive volumes.",
    benefits: [
      "Custom bulk price books and volume discount schemes",
      "Strict customer credit limits & automated payment aging reports",
      "Consolidated transport dispatch bills",
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
    role: "Founder, Patel Drug House",
    businessName: "Medical Store, Ahmedabad",
    rating: 5,
    text: "Switched to Vyaparix for our medical retail store, and it completely streamlined our pharmacy bills. The batch-wise stock alert tells us exactly which medicines are expiring next month. Saved more than ₹25,000 in expired losses already. Best billing software in India!",
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
