import React from 'react';

const NebulaBackground: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      zIndex: -1,
    }} />
  );
};

export default NebulaBackground;
