export const PAKWOOD_PHONE = "03217324620";
export const PAKWOOD_WA_NUMBER = "923217324620";

/**
 * Format a number into Pakistani Rupee format (e.g. 140,000)
 */
export function formatPKR(amount) {
  if (typeof amount !== 'number') return amount;
  return '₨ ' + amount.toLocaleString('en-PK');
}

/**
 * Generate a dynamic WhatsApp direct message URL
 */
export function getWhatsAppLink({
  type = 'inquiry',
  product = null,
  selectedSwatch = null,
  roomType = '',
  dimensions = '',
  woodType = '',
  upholstery = '',
  customNotes = '',
  wishlistItems = []
}) {
  let message = "";

  if (type === 'product' && product) {
    message = `*Salam Pakwood Furniture Multan!*\n\nI am inquiring about the following piece:\n\n*Product:* ${product.title}\n*SKU:* ${product.id}\n*Price:* ${formatPKR(product.price)}\n*Category:* ${product.subcategory || product.category}\n`;
    if (selectedSwatch) {
      message += `*Selected Finish / Color:* ${selectedSwatch}\n`;
    }
    message += `\nPlease confirm production lead time, available fabric swatches, and delivery freight charges to my city.`;
  } else if (type === 'custom') {
    message = `*Salam Pakwood Furniture Multan!*\n\nI would like to request a *Custom Furniture Consultation / Quote*:\n\n`;
    if (roomType) message += `*Space Type:* ${roomType}\n`;
    if (dimensions) message += `*Room Dimensions:* ${dimensions}\n`;
    if (woodType) message += `*Preferred Timber:* ${woodType}\n`;
    if (upholstery) message += `*Preferred Fabric:* ${upholstery}\n`;
    if (customNotes) message += `*Special Requirements:* ${customNotes}\n`;
    message += `\nPlease guide me on estimated budget, 3D design options, and production timeframe.`;
  } else if (type === 'wishlist' && wishlistItems.length > 0) {
    const total = wishlistItems.reduce((acc, item) => acc + (item.price || 0), 0);
    message = `*Salam Pakwood Furniture Multan!*\n\nI have saved ${wishlistItems.length} pieces on your website wishlist and would like to inquire about package pricing and delivery:\n\n`;
    wishlistItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.title}* (${item.id}) - ${formatPKR(item.price)}\n`;
    });
    message += `\n*Combined Catalog Value:* ${formatPKR(total)}\n\nPlease let me know if a package discount is available and what the delivery schedule would be.`;
  } else {
    message = `*Salam Pakwood Furniture Multan!* I am interested in exploring your luxury home & office furniture catalog. Please share your current catalog and custom order details.`;
  }

  return `https://wa.me/${PAKWOOD_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
