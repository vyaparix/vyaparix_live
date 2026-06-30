export interface LandingContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  industries: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const GST_BILLING_SOFTWARE: LandingContent = {
  title: "GST Billing Software for Indian Businesses – Vyaparix",
  description: "Vyaparix is India's best GST billing software for retailers and wholesalers. Generate GST-compliant invoices, auto-calculate CGST/SGST/HSN, and manage inventory offline.",
  h1: "GST Billing Software – Generate GST Compliant Invoices in Seconds",
  intro: "Vyaparix is a powerful GST billing software designed for Indian MSMEs, retailers, wholesalers, and shop owners. Create professional GST invoices with automatic CGST, SGST, IGST, and HSN code calculations. Works 100% offline on your Windows desktop.",
  benefits: [
    { title: "GST Compliant Invoicing", desc: "Auto-generate Tax Invoices, Bill of Supply, Credit Notes, Debit Notes, and Composition Invoices as per Indian GST rules. HSN codes and SAC codes are built-in." },
    { title: "Offline First", desc: "No internet required for daily billing. Vyaparix works fully offline on Windows. Cloud backup to Google Drive happens automatically when online." },
    { title: "Fast Under 5 Seconds", desc: "Create a complete GST invoice in under 5 seconds. Quick item lookup, barcode scanning, and auto-fill customer details make billing lightning fast." },
    { title: "WhatsApp Invoicing", desc: "Send GST invoices directly to customers on WhatsApp with one click. No expensive SMS gateways needed. Customers receive PDF invoice links instantly." },
    { title: "GST Reports for CA", desc: "Export auto-generated GST summary reports, sales registers, and purchase registers to Excel. Share directly with your CA for seamless GST filing." },
    { title: "Unlimited Everything", desc: "No limits on invoices, products, customers, or suppliers. Unlike cloud-based GST billing software that charges per transaction, Vyaparix is truly unlimited." },
  ],
  features: [
    { title: "Auto GST Calculation", desc: "CGST, SGST, IGST calculated automatically based on product HSN codes. Supports 5%, 12%, 18%, 28% GST slabs plus composition scheme." },
    { title: "HSN & SAC Code Library", desc: "Built-in HSN code directory for goods and SAC code directory for services. Just type and select — no memorization needed." },
    { title: "Barcode & SKU Support", desc: "Scan barcodes to add items instantly. Generate and print barcode labels for your products. Perfect for retail billing counters." },
    { title: "Invoice Customization", desc: "Add your business logo, signature, bank details, terms & conditions. Choose from multiple invoice formats and print layouts." },
    { title: "Multi-Party Accounting", desc: "Maintain separate ledgers for customers and suppliers. Track credit (udhaar) balances, payments, and transaction history for each party." },
    { title: "Inventory Integration", desc: "Stock updates automatically when you create invoices or receive purchases. Get real-time stock value, low stock alerts, and inventory reports." },
  ],
  industries: ["Retail Stores", "Wholesalers", "Medical Stores", "Grocery Shops", "Electronics Shops", "Hardware Stores", "Garment Shops", "Restaurants", "Pharmacies", "General Stores"],
  faqs: [
    { q: "Is Vyaparix GST compliant?", a: "Yes, Vyaparix is 100% GST compliant. It supports Tax Invoices, Bill of Supply, Composition Invoices, Credit Notes, Debit Notes, and generates automatic GST summary reports for your CA." },
    { q: "Does Vyaparix work offline?", a: "Yes, Vyaparix is an offline-first billing software. It works fully on your Windows desktop without any internet connection. Cloud backup to Google Drive is optional and happens when internet is available." },
    { q: "Can I print GST invoices on thermal paper?", a: "Yes, Vyaparix supports both A4/A5 laser printers and 2-inch/3-inch thermal POS printers. You can choose the print format based on your printer type." },
    { q: "Does Vyaparix support HSN and SAC codes?", a: "Yes, Vyaparix has a built-in HSN code directory for goods and SAC code directory for services. Auto-fill HSN codes while creating invoices." },
    { q: "Is there a free trial for GST billing software?", a: "Yes, Vyaparix offers a free trial. You can download and use the full-featured version for 7 days. No credit card required." },
  ],
  keywords: ["GST Billing Software", "GST Invoice Generator", "GST Ready Software", "GST Billing App", "GST Software India", "GST Compliant Billing"],
};

export const INVOICE_SOFTWARE: LandingContent = {
  title: "Invoice Software for Small Business – Vyaparix",
  description: "Vyaparix is the best invoice software for Indian small businesses. Create professional GST invoices, send via WhatsApp, print on thermal/A4. Free trial.",
  h1: "Invoice Software – Create Professional Invoices in Seconds",
  intro: "Vyaparix is a powerful invoice software for Indian small businesses, retailers, and freelancers. Create GST-compliant invoices, estimates, and credit notes. Print on thermal or A4 paper. Send invoices via WhatsApp. All fully offline.",
  benefits: [
    { title: "Professional Invoices", desc: "Create beautiful, GST-compliant invoices with your logo, business details, bank info, and signature. Multiple templates available." },
    { title: "WhatsApp Delivery", desc: "Send invoices directly to customers on WhatsApp with one click. No SMS costs. Customers get a PDF link of their invoice instantly." },
    { title: "Print Any Format", desc: "Print on A4, A5, or thermal roll paper. Supports both portrait and landscape orientations. Perfect for any printer type." },
    { title: "Invoice Tracking", desc: "Track all invoices, payment status, and pending amounts from one dashboard. Know exactly who has paid and who hasn't." },
    { title: "Multi-Currency Ready", desc: "Invoice in Indian Rupees with automatic GST calculations. Support for all Indian tax slabs and composition schemes." },
    { title: "Unlimited Invoices", desc: "No per-invoice charges or monthly limits. Create as many invoices as you need. No hidden fees." },
  ],
  features: [
    { title: "GST Auto-Calc", desc: "CGST, SGST, IGST calculated automatically. HSN code lookup built in. Supports all GST slabs." },
    { title: "Invoice Customization", desc: "Add logo, signature, bank details, T&C. Customize colors and layout to match your brand." },
    { title: "Barcode Scanning", desc: "Scan product barcodes to quickly add items to invoices. Works with any barcode scanner." },
    { title: "Customer Management", desc: "Save customer details for repeat billing. Track credit limits, payment history, and outstanding balances." },
    { title: "Excel Export", desc: "Export all invoices and sales data to Excel. Share reports with your accountant or CA." },
    { title: "Cloud Backup", desc: "Auto-backup your invoices and data to Google Drive. Restore on any Windows PC." },
  ],
  industries: ["Retail Stores", "Wholesalers", "Service Providers", "Freelancers", "Restaurants", "Medical Stores", "Hardware Shops", "Garment Shops"],
  faqs: [
    { q: "Can I create invoices without internet?", a: "Yes, Vyaparix works completely offline. All invoice creation, printing, and management happens locally on your Windows PC." },
    { q: "What invoice formats are supported?", a: "Vyaparix supports Tax Invoice, Bill of Supply, Credit Note, Debit Note, Estimate/Quotation, and Payment Receipt formats." },
    { q: "Can I send invoices via WhatsApp?", a: "Yes, with one click you can send any invoice as a PDF link directly to your customer's WhatsApp number." },
    { q: "Is there a limit on invoices?", a: "No, Vyaparix has no limits on the number of invoices you can create. Create unlimited invoices on all plans." },
    { q: "Does it support UPI payment links?", a: "You can add your UPI ID and payment QR code to invoices. Customers can scan and pay directly." },
  ],
  keywords: ["Invoice Software", "Invoice Maker", "Invoice Creator", "Invoice App", "Invoice Generator", "Free Invoice Software", "Invoice Software India"],
};

export const INVENTORY_MANAGEMENT_SOFTWARE: LandingContent = {
  title: "Inventory Management Software for Small Business – Vyaparix",
  description: "Vyaparix is the best inventory management software for Indian retailers. Track stock in real-time, get low stock alerts, manage barcodes. Free trial.",
  h1: "Inventory Management Software – Track Stock in Real-Time",
  intro: "Vyaparix is a powerful inventory management software designed for Indian retail shops, wholesalers, and distributors. Track stock values in real-time, get low stock alerts, manage barcodes, and generate inventory reports. Fully offline on Windows.",
  benefits: [
    { title: "Real-Time Stock Tracking", desc: "Stock automatically updates when you sell or purchase. Know exact stock levels at any time without manual counting." },
    { title: "Low Stock Alerts", desc: "Get instant notifications when stock falls below minimum levels. Auto-generated reorder lists help you never run out." },
    { title: "Barcode Management", desc: "Generate and print barcode labels for your products. Scan barcodes during billing for lightning-fast checkout." },
    { title: "Multiple Warehouses", desc: "Manage stock across multiple shops or godowns. Transfer stock between locations with full audit trail." },
    { title: "Stock Valuation", desc: "Automatic average purchase price calculation. Know your inventory value in real-time for better financial decisions." },
    { title: "Batch & Expiry Tracking", desc: "Track manufacturing dates, expiry dates, and batch numbers. Essential for medical stores and food businesses." },
  ],
  features: [
    { title: "Auto Stock Deduction", desc: "Stock reduces automatically when invoices are created. Increases automatically when purchases are recorded." },
    { title: "Stock Reports", desc: "Generate stock summary, stock valuation, low stock report, and slow-moving item reports. Export to Excel." },
    { title: "Barcode Label Printing", desc: "Design and print barcode labels for your products. Supports multiple label sizes." },
    { title: "Inventory Alerts", desc: "Set minimum stock levels for each item. Get alerts when stock is low. Never miss a reorder." },
    { title: "Purchase Management", desc: "Record purchases and purchase returns. Stock updates automatically. Track supplier-wise purchase history." },
    { title: "Multi-Unit Support", desc: "Manage items in multiple units (Pieces, Box, Kg, Liter, Meter). Automatic unit conversion during billing." },
  ],
  industries: ["Retail Stores", "Medical Stores", "Grocery Shops", "Hardware Stores", "Electronics Shops", "Wholesale Distributors", "Garment Shops", "General Stores"],
  faqs: [
    { q: "Can I track expiry dates?", a: "Yes, Vyaparix supports batch-wise tracking with manufacturing and expiry dates. Get alerts when items are near expiry." },
    { q: "Does inventory update automatically?", a: "Yes, stock levels update automatically when you create invoices or record purchases. No manual stock adjustments needed." },
    { q: "Can I manage multiple shops?", a: "Yes, Vyaparix supports multiple warehouse and godown management. Transfer stock between locations with full tracking." },
    { q: "Does it support barcode scanning?", a: "Yes, you can generate barcode labels and scan them during billing. Works with any USB barcode scanner." },
    { q: "Can I get low stock alerts?", a: "Yes, set minimum stock levels for each item. Vyaparix will notify you when stock falls below the threshold." },
  ],
  keywords: ["Inventory Management Software", "Stock Management Software", "Stock Register Software", "Inventory Tracking Software", "Inventory Software", "Stock Management"],
};

export const FREE_INVOICE_SOFTWARE: LandingContent = {
  title: "Free Invoice Software for Small Business – Vyaparix",
  description: "Vyaparix is the best free invoice software for Indian small businesses. Generate unlimited GST invoices, send via WhatsApp, print on thermal paper. No hidden charges.",
  h1: "Free Invoice Software – Create Unlimited Invoices at Zero Cost",
  intro: "Vyaparix is a powerful free invoice software for Indian small businesses, retailers, and freelancers. Generate GST-compliant invoices, estimates, and credit notes with no limits on invoices, products, or customers. Print on thermal or A4 paper. Send invoices via WhatsApp. Works fully offline on Windows.",
  benefits: [
    { title: "100% Free to Use", desc: "Create unlimited invoices with zero per-invoice charges. No hidden fees, no subscription traps. Pay only when you're ready for advanced features." },
    { title: "GST Compliant", desc: "Auto-calculate CGST, SGST, IGST on every invoice. Built-in HSN and SAC code library. Tax invoices, Bill of Supply, Credit Notes all supported." },
    { title: "WhatsApp Delivery", desc: "Send professional invoices directly to customers on WhatsApp with one click. No SMS gateway costs. Customers get PDF invoice links instantly." },
    { title: "Thermal & A4 Printing", desc: "Print invoices on A4, A5, or thermal roll paper. Supports both portrait and landscape. Works with any printer type including 2-inch and 3-inch POS printers." },
    { title: "Unlimited Customers", desc: "Save unlimited customer details for repeat billing. Track credit balances, payment history, and outstanding amounts for each customer." },
    { title: "Cloud Backup", desc: "Auto-backup your invoices and data to Google Drive for free. Restore on any Windows PC whenever needed." },
  ],
  features: [
    { title: "Auto GST Calculation", desc: "CGST, SGST, IGST calculated automatically. Supports all GST slabs: 5%, 12%, 18%, 28%." },
    { title: "Barcode Scanning", desc: "Add items to invoices instantly using any USB barcode scanner. Quick item lookup by name or code." },
    { title: "Invoice Customization", desc: "Add your logo, signature, bank details, and T&C. Multiple invoice templates to choose from." },
    { title: "Customer Ledger", desc: "Digital khata for every customer. Track udhaar balances and payment history at a glance." },
    { title: "Excel Export", desc: "Export invoices and sales data to Excel. Share reports with your accountant or CA effortlessly." },
    { title: "Multi-Unit Support", desc: "Bill in pieces, boxes, kg, liters, meters. Automatic unit conversion during invoice creation." },
  ],
  industries: ["Retail Stores", "Freelancers", "Service Providers", "Medical Stores", "Grocery Shops", "Hardware Shops", "Garment Shops", "General Stores"],
  faqs: [
    { q: "Is Vyaparix really free?", a: "Yes, Vyaparix offers a free version with unlimited invoices. You only need to purchase when you need advanced features like inventory management or WhatsApp automation." },
    { q: "Can I create GST invoices for free?", a: "Yes, the free version supports full GST invoicing with automatic CGST, SGST, IGST calculations and HSN code lookup." },
    { q: "Is there a limit on free invoices?", a: "No, there is no limit. Create unlimited invoices, manage unlimited customers and products on the free plan." },
    { q: "Does the free version include WhatsApp invoicing?", a: "WhatsApp invoicing is available in the paid version. The free version allows PDF export and email delivery." },
    { q: "Can I upgrade later?", a: "Yes, you can upgrade to the paid version anytime. Your data will be preserved and you'll unlock all premium features." },
  ],
  keywords: ["Free Invoice Software", "Free Invoice Maker", "Free GST Invoice Software", "Free Billing Software", "Invoice Software Free", "Free Invoice Generator India"],
};

export const SHOP_MANAGEMENT_SOFTWARE: LandingContent = {
  title: "Shop Management Software for Retail Stores – Vyaparix",
  description: "Vyaparix is the best shop management software for Indian retail stores. Manage billing, inventory, khata, purchases, and reports from one desktop app. Free trial.",
  h1: "Shop Management Software – Run Your Entire Store from One App",
  intro: "Vyaparix is a complete shop management software designed for Indian retail stores, kirana shops, and wholesale businesses. Manage GST billing, inventory tracking, customer khata, purchase management, and business reports from one powerful Windows desktop application. Fully offline.",
  benefits: [
    { title: "All-in-One Solution", desc: "Billing, inventory, khata, purchases, and reports in one software. No need for multiple apps or spreadsheets." },
    { title: "GST Billing", desc: "Generate GST-compliant invoices with auto CGST/SGST/IGST calculations. Supports all invoice types including Tax Invoice and Bill of Supply." },
    { title: "Inventory Tracking", desc: "Real-time stock updates on every sale and purchase. Low stock alerts, barcode management, and stock valuation reports." },
    { title: "Customer Khata", desc: "Digital ledger for every customer. Track credit (udhaar) balances, payment history, and send WhatsApp reminders." },
    { title: "Purchase Management", desc: "Record purchases and purchase returns. Stock updates automatically. Track supplier-wise purchase history and payments." },
    { title: "Business Reports", desc: "Generate daybook, profit & loss, GST summary, and sales reports. Export to Excel for your CA." },
  ],
  features: [
    { title: "POS Billing", desc: "Fast point-of-sale billing with barcode scanning. Quick item lookup and customer selection." },
    { title: "Stock Management", desc: "Real-time inventory tracking with auto stock deduction. Batch and expiry tracking for medical stores." },
    { title: "Customer Management", desc: "Save customer details, track credit limits, view full transaction history." },
    { title: "Supplier Management", desc: "Track supplier dues, purchase history, and payment schedules." },
    { title: "WhatsApp Invoicing", desc: "Send invoices and payment reminders via WhatsApp with one click." },
    { title: "Cloud Backup", desc: "Automatic Google Drive backup. Restore data on any Windows PC." },
  ],
  industries: ["Retail Stores", "Kirana Shops", "Medical Stores", "Hardware Shops", "Electronics Shops", "Garment Stores", "General Stores", "Wholesale Distributors"],
  faqs: [
    { q: "What is shop management software?", a: "Shop management software is an all-in-one solution that helps retail stores manage billing, inventory, customer accounts, purchases, and business reporting from a single application." },
    { q: "Can I manage both billing and inventory?", a: "Yes, Vyaparix integrates billing and inventory seamlessly. Stock updates automatically when you create invoices or receive purchases." },
    { q: "Is Vyaparix suitable for small kirana shops?", a: "Absolutely. Vyaparix is designed for Indian MSMEs and small shops. It's affordable, works offline, and requires no technical training." },
    { q: "Does it support multiple shops?", a: "Yes, Vyaparix supports multiple warehouses and godowns. You can manage stock across different locations." },
    { q: "Can I print barcode labels?", a: "Yes, Vyaparix allows you to generate and print barcode labels for your products. Works with any standard label printer." },
  ],
  keywords: ["Shop Management Software", "Retail Management Software", "Store Management Software", "Shop Billing Software", "Retail POS Software", "Shop Accounting Software"],
};

export const STOCK_MANAGEMENT_SOFTWARE: LandingContent = {
  title: "Stock Management Software for Small Business – Vyaparix",
  description: "Vyaparix is India's best stock management software for retailers and wholesalers. Track inventory in real-time, get low stock alerts, manage barcodes. Free trial.",
  h1: "Stock Management Software – Never Run Out of Stock Again",
  intro: "Vyaparix is a powerful stock management software designed for Indian retailers, wholesalers, and distributors. Track stock levels in real-time, get automatic low stock alerts, manage barcode labels, and generate detailed inventory reports. Fully offline on Windows.",
  benefits: [
    { title: "Real-Time Stock Tracking", desc: "Stock levels update automatically with every sale and purchase. Know exact inventory at any moment without manual counting." },
    { title: "Low Stock Alerts", desc: "Set minimum stock levels for each item. Get instant notifications when stock is running low. Auto-generate reorder lists." },
    { title: "Barcode Management", desc: "Generate and print barcode labels. Scan barcodes during billing for fast checkout and accurate inventory tracking." },
    { title: "Stock Valuation", desc: "Automatic average cost calculation. Know your total inventory value in real-time for better financial decisions." },
    { title: "Batch & Expiry Tracking", desc: "Track manufacturing dates, expiry dates, and batch numbers. Essential for medical stores and food businesses." },
    { title: "Multi-Warehouse", desc: "Manage stock across multiple shops, godowns, or warehouses. Transfer stock between locations with full audit trail." },
  ],
  features: [
    { title: "Auto Stock Deduction", desc: "Stock reduces automatically when invoices are created. Increases when purchases are recorded." },
    { title: "Stock Reports", desc: "Stock summary, valuation, low stock report, slow-moving items. Export to Excel." },
    { title: "Purchase Orders", desc: "Create purchase orders and convert to purchases on receipt. Track pending orders." },
    { title: "Stock Transfer", desc: "Transfer stock between warehouses with complete tracking and approval workflow." },
    { title: "Inventory Alerts", desc: "Email and in-app alerts for low stock, expired items, and overstock situations." },
    { title: "Multi-Unit Support", desc: "Manage items in pieces, boxes, kg, liters, meters. Auto unit conversion." },
  ],
  industries: ["Retail Stores", "Medical Stores", "Grocery Shops", "Hardware Stores", "Electronics Shops", "Wholesale Distributors", "Garment Shops", "General Stores"],
  faqs: [
    { q: "How does stock management software help my business?", a: "Stock management software automates inventory tracking, prevents stockouts and overstocking, reduces manual errors, and provides real-time visibility into your inventory value." },
    { q: "Does Vyaparix update stock automatically?", a: "Yes, stock levels update automatically when you create invoices or record purchases. No manual adjustments needed." },
    { q: "Can I track expiry dates?", a: "Yes, Vyaparix supports batch-wise tracking with manufacturing and expiry dates. Get alerts when items are near expiry." },
    { q: "Does it support barcode scanning?", a: "Yes, you can generate barcode labels and scan them during billing. Works with any USB barcode scanner." },
    { q: "Can I manage multiple godowns?", a: "Yes, Vyaparix supports multiple warehouses with stock transfer capabilities between locations." },
  ],
  keywords: ["Stock Management Software", "Inventory Management Software", "Stock Control Software", "Stock Register Software", "Inventory Tracking Software", "Stock Software India"],
};

export const RETAIL_BILLING_SOFTWARE: LandingContent = {
  title: "Retail Billing Software for Shops – Vyaparix",
  description: "Vyaparix is the best retail billing software for Indian shops and stores. Fast POS billing, GST invoices, barcode scanning, and inventory management. Free trial.",
  h1: "Retail Billing Software – Fast POS Billing for Indian Retail Stores",
  intro: "Vyaparix is a powerful retail billing software designed for Indian retail shops, supermarkets, and stores. Generate GST invoices in under 5 seconds with barcode scanning, quick item lookup, and automatic GST calculations. Print on thermal or A4 paper. Fully offline on Windows.",
  benefits: [
    { title: "Lightning Fast Billing", desc: "Create invoices in under 5 seconds. Barcode scanning, quick item lookup, and auto-fill customer details make checkout blazing fast." },
    { title: "GST Compliant", desc: "Auto-calculate CGST, SGST, IGST with built-in HSN codes. Supports all GST slabs and invoice types including Tax Invoice and Bill of Supply." },
    { title: "Barcode Scanning", desc: "Scan product barcodes to add items instantly. Generate and print barcode labels for your products. Works with any USB scanner." },
    { title: "Thermal & A4 Printing", desc: "Print receipts on 2-inch and 3-inch thermal POS printers. Print detailed invoices on A4/A5 paper. Multiple format options." },
    { title: "Customer Management", desc: "Save customer details for repeat billing. Track credit balances and payment history. Send WhatsApp invoices." },
    { title: "Inventory Integration", desc: "Stock updates automatically with every sale. Get low stock alerts and real-time inventory reports." },
  ],
  features: [
    { title: "POS Billing Interface", desc: "Clean, fast point-of-sale interface designed for retail counters. Minimal clicks for maximum speed." },
    { title: "Multi-Payment Support", desc: "Accept cash, card, UPI, and credit payments. Record partial payments and split payments." },
    { title: "Item Search & Lookup", desc: "Search items by name, code, or barcode. Favorites and recent items for quick access." },
    { title: "Discount & Schemes", desc: "Apply item-level and bill-level discounts. Create special schemes and offers for customers." },
    { title: "Customer Display", desc: "Show bill amount to customers on a secondary display or customer-facing screen." },
    { title: "Day-End Reports", desc: "Automatic day-end summary with sales totals, payment breakup, and GST summary." },
  ],
  industries: ["Retail Stores", "Supermarkets", "Medical Stores", "Grocery Shops", "Electronics Shops", "Hardware Stores", "Garment Shops", "General Stores"],
  faqs: [
    { q: "What is retail billing software?", a: "Retail billing software is a POS system designed for retail stores to create invoices, manage inventory, and track sales efficiently." },
    { q: "Can I use Vyaparix with a thermal printer?", a: "Yes, Vyaparix supports all 2-inch and 3-inch thermal POS printers for quick receipt printing." },
    { q: "Does it support barcode scanning?", a: "Yes, Vyaparix fully supports barcode scanning. Just connect any USB barcode scanner and start scanning." },
    { q: "Is Vyaparix GST compliant?", a: "Yes, Vyaparix is 100% GST compliant with automatic CGST, SGST, IGST calculations and HSN code support." },
    { q: "Can I manage inventory along with billing?", a: "Yes, Vyaparix integrates inventory management with billing. Stock updates automatically on every sale." },
  ],
  keywords: ["Retail Billing Software", "POS Billing Software", "Retail POS System", "Billing Software for Shops", "Retail Invoice Software", "POS Software India"],
};

export const BILLING_SOFTWARE_INDIA: LandingContent = {
  title: "Billing Software India – Best GST Billing for Indian Businesses",
  description: "Vyaparix is India's best billing software for small businesses. GST compliant, offline-first, unlimited invoices, WhatsApp invoicing. Trusted by 10,000+ businesses.",
  h1: "Billing Software India – India's Most Trusted Billing Solution",
  intro: "Vyaparix is India's leading billing software designed for Indian small businesses, retailers, wholesalers, and MSMEs. Generate GST-compliant invoices, manage inventory, track customer khata, send WhatsApp invoices, and generate business reports from one powerful desktop application. Fully offline.",
  benefits: [
    { title: "Made for India", desc: "Designed specifically for Indian businesses with GST compliance, HSN/SAC codes, Indian currency, and regional language support." },
    { title: "GST Compliant", desc: "100% GST compliant with auto CGST, SGST, IGST calculations. Supports Tax Invoice, Bill of Supply, Credit Note, and Debit Note." },
    { title: "Offline First", desc: "Works completely offline on your Windows desktop. No internet needed for daily billing operations. Cloud backup optional." },
    { title: "WhatsApp Invoicing", desc: "Send invoices directly to customers on WhatsApp. No SMS costs. Customers receive PDF links instantly." },
    { title: "Unlimited Everything", desc: "No limits on invoices, products, customers, or suppliers. Truly unlimited billing software for Indian businesses." },
    { title: "One-Time Purchase", desc: "Affordable lifetime license available. No monthly subscription pressure. Pay once, use forever." },
  ],
  features: [
    { title: "GST Billing", desc: "Auto GST calculation with HSN/SAC codes. All invoice types supported." },
    { title: "Inventory Management", desc: "Real-time stock tracking with low stock alerts and barcode management." },
    { title: "Customer Khata", desc: "Digital ledger for every customer. Track udhaar and payment history." },
    { title: "WhatsApp Automation", desc: "Send invoices and payment reminders via WhatsApp." },
    { title: "Business Reports", desc: "Daybook, P&L, GST summary, sales analysis. Export to Excel." },
    { title: "Cloud Backup", desc: "Automatic Google Drive backup for data safety." },
  ],
  industries: ["Retail Stores", "Wholesalers", "Medical Stores", "Grocery Shops", "Electronics Shops", "Hardware Stores", "Garment Shops", "Restaurants"],
  faqs: [
    { q: "Why choose Vyaparix over other billing software in India?", a: "Vyaparix is designed specifically for Indian businesses with offline-first architecture, unlimited invoices, one-time purchase option, and WhatsApp invoicing at no extra cost." },
    { q: "Is Vyaparix compliant with Indian GST?", a: "Yes, Vyaparix is 100% GST compliant with automatic CGST, SGST, IGST calculations and built-in HSN/SAC code library." },
    { q: "Does Vyaparix work without internet?", a: "Yes, Vyaparix works fully offline on Windows. Internet is only needed for cloud backup and WhatsApp invoicing." },
    { q: "What is the pricing for Indian businesses?", a: "Vyaparix offers flexible pricing including a free version, affordable annual plans, and a lifetime one-time purchase option." },
    { q: "Can I send invoices via WhatsApp?", a: "Yes, Vyaparix allows you to send professional invoices directly to customers on WhatsApp with one click." },
  ],
  keywords: ["Billing Software India", "Indian Billing Software", "GST Billing Software India", "Best Billing Software India", "Billing App India", "Invoice Software India"],
};

export const INVOICE_GENERATOR: LandingContent = {
  title: "Invoice Generator – Create GST Invoices Online & Offline | Vyaparix",
  description: "Vyaparix is the best invoice generator for Indian businesses. Create professional GST invoices, estimates, and receipts. Print, email, or WhatsApp invoices. Free trial.",
  h1: "Invoice Generator – Create Professional GST Invoices in Seconds",
  intro: "Vyaparix is a powerful invoice generator for Indian small businesses, freelancers, and retailers. Create GST-compliant invoices, estimates, credit notes, and payment receipts. Auto-calculate GST, add your logo, print on thermal or A4, and send via WhatsApp. Works fully offline on Windows.",
  benefits: [
    { title: "Instant Invoice Creation", desc: "Create a professional GST invoice in under 5 seconds. Quick item lookup, barcode scanning, and auto-fill customer details." },
    { title: "GST Auto-Calculated", desc: "CGST, SGST, IGST calculated automatically based on HSN codes. Supports all GST slabs and tax invoice formats." },
    { title: "Professional Templates", desc: "Choose from multiple invoice templates. Add your logo, signature, bank details, and terms & conditions." },
    { title: "WhatsApp Sharing", desc: "Send invoices as PDF links directly to customers on WhatsApp. No expensive SMS gateways needed." },
    { title: "Print Any Format", desc: "Print on A4, A5, or thermal roll paper. Supports both portrait and landscape orientations." },
    { title: "Unlimited Invoices", desc: "No per-invoice charges or monthly limits. Create as many invoices as you need." },
  ],
  features: [
    { title: "Multiple Invoice Types", desc: "Tax Invoice, Bill of Supply, Credit Note, Debit Note, Estimate, Payment Receipt." },
    { title: "GST Calculation", desc: "Auto CGST, SGST, IGST. Built-in HSN and SAC code directory." },
    { title: "Custom Branding", desc: "Add logo, signature, bank details, T&C. Customize invoice layout." },
    { title: "Customer Database", desc: "Save customers for repeat billing. Track payment history." },
    { title: "Export to PDF/Excel", desc: "Download invoices as PDF. Export data to Excel for accounting." },
    { title: "Cloud Backup", desc: "Auto-backup invoices to Google Drive. Access from any PC." },
  ],
  industries: ["Retail Stores", "Freelancers", "Service Providers", "Small Businesses", "Restaurants", "Medical Stores", "Hardware Shops", "Consultants"],
  faqs: [
    { q: "What is an invoice generator?", a: "An invoice generator is software that helps businesses create professional invoices quickly with automatic calculations, templates, and digital delivery options." },
    { q: "Can I generate GST invoices?", a: "Yes, Vyaparix generates fully GST-compliant invoices with automatic CGST, SGST, IGST calculations and HSN code support." },
    { q: "Can I send invoices via WhatsApp?", a: "Yes, with one click you can send any invoice as a PDF link directly to your customer's WhatsApp number." },
    { q: "Is there a free invoice generator?", a: "Yes, Vyaparix offers a free version that lets you create unlimited invoices. Premium features are available in paid plans." },
    { q: "Can I print invoices on thermal paper?", a: "Yes, Vyaparix supports both A4/A5 laser printing and 2-inch/3-inch thermal POS printing." },
  ],
  keywords: ["Invoice Generator", "Invoice Maker", "Invoice Creator", "GST Invoice Generator", "Free Invoice Generator", "Online Invoice Generator", "Invoice Generator India"],
};

export const BUSINESS_MANAGEMENT_SOFTWARE: LandingContent = {
  title: "Business Management Software for Small Business – Vyaparix",
  description: "Vyaparix is the best business management software for Indian small businesses. Manage billing, inventory, accounting, customer relationships, and reports. Free trial.",
  h1: "Business Management Software – Manage Your Entire Business from One Place",
  intro: "Vyaparix is a comprehensive business management software for Indian small businesses, retailers, and MSMEs. Combine GST billing, inventory management, customer relationship management, purchase tracking, and business analytics into one powerful desktop application. Fully offline on Windows.",
  benefits: [
    { title: "Complete Business Suite", desc: "Billing, inventory, khata, purchases, and reports all in one software. No need for multiple tools or spreadsheets." },
    { title: "GST Billing", desc: "Generate GST-compliant invoices with automatic tax calculations. Supports all invoice types and HSN/SAC codes." },
    { title: "Inventory Control", desc: "Real-time stock tracking, low stock alerts, barcode management, and multi-warehouse support." },
    { title: "CRM Features", desc: "Track customer interactions, credit limits, payment history, and send WhatsApp communications." },
    { title: "Business Analytics", desc: "Comprehensive reports including P&L, GST summary, sales analysis, and inventory valuation. Export to Excel." },
    { title: "Affordable Pricing", desc: "One-time purchase option available. No monthly subscription pressure. Lifetime free updates." },
  ],
  features: [
    { title: "Unified Dashboard", desc: "Single screen showing sales, stock, receivables, and key business metrics." },
    { title: "GST Invoice System", desc: "Complete GST invoicing with auto calculations and multi-format support." },
    { title: "Inventory Management", desc: "Real-time tracking, barcodes, batch/expiry, and multi-warehouse." },
    { title: "Customer Management", desc: "Ledger, credit tracking, WhatsApp invoicing, and payment reminders." },
    { title: "Purchase Management", desc: "Purchase orders, supplier management, and auto stock updates." },
    { title: "Reporting Suite", desc: "Daybook, P&L, GST summary, sales analysis, inventory reports." },
  ],
  industries: ["Retail Stores", "Wholesalers", "Medical Stores", "Grocery Shops", "Electronics Shops", "Hardware Stores", "Garment Shops", "Restaurants"],
  faqs: [
    { q: "What is business management software?", a: "Business management software integrates multiple business functions like billing, inventory, accounting, and CRM into a single platform for streamlined operations." },
    { q: "Is Vyaparix suitable for my small business?", a: "Yes, Vyaparix is designed specifically for Indian small businesses, MSMEs, and retail stores. It's affordable, easy to use, and works offline." },
    { q: "Does it include accounting features?", a: "Yes, Vyaparix includes customer/supplier ledgers, profit & loss reports, daybook, and GST summary reports for basic accounting needs." },
    { q: "Can I manage multiple business locations?", a: "Yes, Vyaparix supports multi-warehouse management and can handle multiple business locations." },
    { q: "Is there a one-time purchase option?", a: "Yes, Vyaparix offers a lifetime one-time purchase license along with annual subscription plans." },
  ],
  keywords: ["Business Management Software", "Small Business Management Software", "Business Software India", "Business Management System", "ERP Software India", "Business Software for Small Business"],
};

export const landingPages: Record<string, LandingContent> = {
  "gst-billing-software": GST_BILLING_SOFTWARE,
  "invoice-software": INVOICE_SOFTWARE,
  "inventory-management-software": INVENTORY_MANAGEMENT_SOFTWARE,
  "free-invoice-software": FREE_INVOICE_SOFTWARE,
  "shop-management-software": SHOP_MANAGEMENT_SOFTWARE,
  "stock-management-software": STOCK_MANAGEMENT_SOFTWARE,
  "retail-billing-software": RETAIL_BILLING_SOFTWARE,
  "billing-software-india": BILLING_SOFTWARE_INDIA,
  "invoice-generator": INVOICE_GENERATOR,
  "business-management-software": BUSINESS_MANAGEMENT_SOFTWARE,
};

export const LANDING_PAGE_KEYS = [
  "gst-billing-software",
  "invoice-software",
  "free-invoice-software",
  "shop-management-software",
  "inventory-management-software",
  "stock-management-software",
  "retail-billing-software",
  "billing-software-india",
  "invoice-generator",
  "business-management-software",
];
