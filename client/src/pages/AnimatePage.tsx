import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Typed from "typed.js";

const AnimatePage: React.FC = () => {
  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement?.classList.add("no-padding");

    return () => {
      rootElement?.classList.remove("no-padding");
    };
  }, []);

  useEffect(() => {
    const options = {
      strings: ["Welcome to Olatinsu's Blog"],
      typeSpeed: 150,
      backSpeed: 50,
      showCursor: true,
      cursorChar: "|",
      fadeOut: true,
      fadeOutDelay: 1000,
      smartBackspace: true,
      startDelay: 1000,
      backDelay: 1500,
    };

    // Initialize Typed.js
    const typed = new Typed(".auto-type", options);

    // Cleanup on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  const [redirect, setRedirect] = useState(false);
  setTimeout(() => {
    setRedirect(true);
  }, 8000);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="p-0">
      <div className="w-screen p-0 h-[90vh] flex items-center justify-center font-montserrat bg-blue-500 text-white">
        <p className="text-6xl font-semibold">
          <span className="auto-type"></span>
        </p>
      </div>
    </div>
  );
};

export default AnimatePage;
