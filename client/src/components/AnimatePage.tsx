import React, { useEffect } from "react";
import Typed from "typed.js";

const AnimatePage: React.FC = () => {
  useEffect(() => {
    const options = {
      strings: ["Welcome to Olatinsu's Blog"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|',
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

  return (
    <div className="w-full h-[90vh] flex items-center justify-center font-montserrat bg-inherit">
      <p className="text-6xl font-semibold">
        <span className="auto-type"></span>
      </p>
    </div>
  );
};

export default AnimatePage;
