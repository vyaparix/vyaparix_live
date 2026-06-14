/**
 * Vyaparix Asset Configuration File
 * 
 * Here you can easily configure and change the images used throughout your website.
 * You can set your custom images in one of TWO ways:
 * 
 * METHOD 1: LOCAL IMAGES (Upload files via Sidebar)
 * 1. Click on the file explorer sidebar or settings in AI Studio.
 * 2. Upload your images (e.g. logo, dashboard, billing screenshot) to the path: `/src/assets/images/`
 * 3. Import them below and assign them to the respective fields in the IMAGES object.
 * 
 * METHOD 2: ONLINE IMAGES (No upload required)
 * 1. Upload your photos to any public cloud storage or image host (Imgur, PostImages, direct Google Drive, etc.)
 * 2. Copy the public "direct link" of the image (it should end in .png, .jpg, or .jpeg)
 * 3. Replace the fields below with your public URL strings (e.g., logo: "https://example.com/my-logo.png")
 */

import defaultLogo from "./assets/images/vyaparix_logo.png";
import defaultDashboard from "./assets/images/vyaparix_deshboard.png";
import defaultBilling from "./assets/images/vyaparix_billing_studio.png";
import defaultInvoice from "./assets/images/vyaparix_invoive.png";

export const IMAGES = {
  // 1. App logo icon (Used in header navbar, comparison benefits cards, and footer cols)
  logo: defaultLogo,

  // 2. Dashboard main preview (Used in Hero section background laptop and device showcase laptop tab)
  dashboard: defaultDashboard,

  // 3. Billing Studio interface (Used in device showcase desktop layout, tablet layout, and footer preview)
  billing: defaultBilling,

  // 4. Output invoice page print template format (Used in device showcase mobile live print mockup view)
  invoice: defaultInvoice,
};
