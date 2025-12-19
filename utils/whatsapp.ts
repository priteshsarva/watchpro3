
import { CartItem, Product } from '../types';

const STORE_PHONE = '919876543210'; // Replace with actual store number

export const generateWhatsAppLink = (
  items: CartItem[], 
  userDetails: { name: string; address: string; phone: string }
) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let message = `*New Order from Ultimate Watch Store*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${userDetails.name}\n`;
  message += `Phone: ${userDetails.phone}\n`;
  message += `Address: ${userDetails.address}\n\n`;
  
  message += `*Order Summary:*\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.brand}) - x${item.quantity} - ₹${item.price * item.quantity}\n`;
  });
  
  message += `\n*Total: ₹${subtotal}*`;
  
  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
};

export const generateQuickBuyLink = (product: Product) => {
  let message = `*Quick Buy Request - Watch Pro Store*\n\n`;
  message += `I'm interested in purchasing the following timepiece:\n\n`;
  message += `*Product:* ${product.name}\n`;
  message += `*Brand:* ${product.brand}\n`;
  message += `*Price:* ₹${product.price}\n\n`;
  message += `Please share payment details and estimated delivery for my location.`;

  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
};
