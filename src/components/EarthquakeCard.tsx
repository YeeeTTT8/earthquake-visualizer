import React from 'react';
import { motion } from 'framer-motion';

interface Earthquake {
  id: string;
  place: string;
  magnitude: number;
  time: string;
  latitude: number;
  longitude: number;
}

interface EarthquakeCardProps {
  quake: Earthquake;
}

const EarthquakeCard: React.FC<EarthquakeCardProps> = ({ quake }) => {
  return (
    <motion.div 
      className="card shadow-lg position-relative"
      style={{
        background: 'rgba(255, 255, 255, 0.05)', // Soft glass
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
        borderRadius: '15px',
        overflow: 'hidden',
        minHeight: '180px',
        padding: '1.2rem'
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* BADGE */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: quake.magnitude >= 5 ? '#ff5722' : quake.magnitude >= 3 ? '#ff9800' : '#00e676',
          color: 'black',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}
      >
        {quake.magnitude.toFixed(1)}
      </div>

      {/* CARD BODY */}
      <div className="card-body">
        <h5 className="card-title">{quake.place}</h5>
        <p className="card-text">
          <strong>Magnitude:</strong> {quake.magnitude}<br />
          <strong>Time:</strong> {quake.time}
        </p>
      </div>
    </motion.div>
  );
};

export default EarthquakeCard;
