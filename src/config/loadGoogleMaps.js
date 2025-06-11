let isLoading = false;
let loadPromise = null;

export function loadGoogleMaps() {
  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    try {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places,marker&v=beta`;
      console.log("Loading Google Maps script:", script.src);
      script.async = true; // Load script asynchronously
      script.defer = true; // Ensure script execution is deferred

      script.addEventListener("load", () => {
        isLoading = false;
        resolve();
      });

      script.addEventListener("error", (error) => {
        isLoading = false;
        reject(error);
      });

      document.head.appendChild(script);
    } catch (error) {
      isLoading = false;
      reject(error);
    }
  });

  return loadPromise;
}