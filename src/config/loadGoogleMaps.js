// loadGoogleMaps.js
let isLoaded = false;
let loadPromise = null;

export function loadGoogleMaps() {
  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  // Use the environment variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  if (!apiKey) {
    return Promise.reject(new Error('Google Maps API key is missing'));
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry${mapId ? `&map_ids=${mapId}` : ''}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = (error) => {
      console.error('Google Maps script loading failed:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}