/**
 * Utility to track custom events in Meta Pixel
 * @param {string} eventName 
 * @param {object} params 
 */
export const trackPixelEvent = (eventName, params = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, params);
  } else {
    console.debug(`[MetaPixel] Event ${eventName} skipped (Pixel not initialized)`, params);
  }
};
