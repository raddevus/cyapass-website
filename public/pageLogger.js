// src/scripts/pagelogger.js

function logPageView() {
  console.log("Navigated to:", window.location.pathname);
    const metadata = {
    path: window.location.pathname.replaceAll("/","-"),
    fullURL: window.location.href.replaceAll("/","-"),
    referrer: document.referrer || "No referrer",
    userAgent: navigator.userAgent.replaceAll("/","-"),
  };
   console.log(`UserAgent: ${metadata.userAgent}`);
   fetch(`https://allos.dev/api/save/allos.dev/${metadata.path}/${metadata.userAgent}`);
  console.log("🔍 Page Metadata:", metadata);
}

// Initial load
logPageView();

// Listen for Astro navigation events
document.addEventListener('astro:after-swap', logPageView);

