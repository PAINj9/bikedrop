import React from "react";

export default function BookingFooter() {
  return (
    <footer className="text-center text-xs text-gray-500 mt-8 px-4 pb-6">
      <p className="mb-1">
        📍 Based in Aarhus. BikeDrop comes to you.
      </p>
      <p className="mb-1">
        Need help?{" "}
        <a
          href="mailto:info@bikedrop.dk"
          className="text-blue-600 hover:underline"
        >
          bikedropdk@gmail.com
        </a>
      </p>
      <p className="mt-2">© 2025 BikeDrop. Made with 💚 and WD-40.</p>
    </footer>
  );
}
