import defaultLogo from "./assets/images/vyaparix_logo.webp";
import defaultDashboard from "./assets/images/vyaparix_deshboard.webp";
import defaultBilling from "./assets/images/vyaparix_billing_studio.webp";

import inventoryMgmt from "./assets/images/Inventory Management.png";
import purchaseMgmt from "./assets/images/Purchase Management.png";
import customerLedger from "./assets/images/Customer Ledger.png";
import whatsappIntegration from "./assets/images/Whatsapp intigration.png";
import salesReports from "./assets/images/sale repoer .png";
import invoicePrint from "./assets/images/print.png";
import stockAlerts from "./assets/images/stock Alert.png";

export const IMAGES = {
  logo: defaultLogo,
  dashboard: defaultDashboard,
  billing: defaultBilling,
};

export const FEATURE_IMAGES: Record<string, string> = {
  "Inventory Management": inventoryMgmt,
  "Purchase Management": purchaseMgmt,
  "Customer Ledger": customerLedger,
  "WhatsApp Automation": whatsappIntegration,
  "Sales Reports": salesReports,
  "Stock Alerts": stockAlerts,
  "Invoice Printing": invoicePrint,
  "Dashboard Overview": defaultDashboard,
  "Billing Studio": defaultBilling,
};
