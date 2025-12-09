import React from 'react';

const Loader = () => {
  // --- 1. Define Keyframes (Must be in a style tag) ---
  const keyframesStyle = `
    @keyframes spinAnimation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulseAnimation {
      0% { transform: scale(0.95); box-shadow: 0 0 10px rgba(0, 119, 182, 0.4); }
      50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(0, 119, 182, 0.6); }
      100% { transform: scale(0.95); box-shadow: 0 0 10px rgba(0, 119, 182, 0.4); }
    }
    @keyframes textBounce {
      0%, 100% { transform: translateY(0); opacity: 0.8; }
      50% { transform: translateY(-3px); opacity: 1; color: #0096c7; }
    }
  `;

  // --- 2. Define Styles Object (JSX Style) ---
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: '#f8f9fa',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    globe: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #0077b6, #48cae4)',
      borderRadius: '50%',
      position: 'relative',
      boxShadow: '0 0 15px rgba(0, 119, 182, 0.4)',
      animation: 'pulseAnimation 2s infinite ease-in-out',
    },
    // Since we can't use ::before in inline styles, we use a real div for the lines
    globeLines: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    globeInnerLines: {
      position: 'absolute',
      top: '15%',
      left: '15%',
      width: '70%',
      height: '70%',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    orbit: {
      position: 'absolute',
      top: '-20px',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '1px dashed #ced4da',
      animation: 'spinAnimation 3s linear infinite',
    },
    plane: {
      position: 'absolute',
      top: '12px',
      left: '8px',
      color: '#023e8a',
      transform: 'rotate(-45deg)',
    },
    textContainer: {
      marginTop: '40px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      color: '#023e8a',
      letterSpacing: '2px',
      fontSize: '14px',
      textTransform: 'uppercase',
    },
    char: {
      display: 'inline-block',
      animation: 'textBounce 1.5s infinite',
    }
  };

  // Helper to stagger animation delay for text
  const getCharStyle = (index) => ({
    ...styles.char,
    animationDelay: index % 2 === 0 ? '0.3s' : '0.1s',
  });

  const text = "Planning Trip...".split("");

  return (
    <div style={styles.wrapper}>
      {/* Inject Keyframes */}
      <style>{keyframesStyle}</style>

      <div style={styles.content}>
        
        {/* Globe Structure */}
        <div style={styles.globe}>
          <div style={styles.globeLines}>
            <div style={styles.globeInnerLines}></div>
          </div>
        </div>

        {/* Orbit Ring & Plane */}
        <div style={styles.orbit}>
          <div style={styles.plane}>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div style={styles.textContainer}>
          {text.map((char, index) => (
            <span key={index} style={getCharStyle(index)}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Loader;