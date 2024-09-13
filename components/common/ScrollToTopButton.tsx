"use client"
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            zIndex: "1000",
          }}
        >
          <button
            onClick={scrollToTop}
            style={{
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            ↑
          </button>
        </div>
      )}
    </>
  );
}
