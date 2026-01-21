import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

/**
 * MetaPixel Component
 * Handles initialization and PageView tracking for Single Page Application.
 */
const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (!PIXEL_ID) {
      console.warn('Meta Pixel ID not found. Please set VITE_META_PIXEL_ID in your .env file.');
      return;
    }

    // Initialize Pixel if not already done
    if (!window.fbq) {
      /* eslint-disable */
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      
      fbq('init', PIXEL_ID);
      /* eslint-enable */
    }

    // Track PageView on route change
    window.fbq('track', 'PageView');
  }, [location]);

  return null;
};

export default MetaPixel;
