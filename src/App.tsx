import React, { useEffect, useState } from 'react';
import './styles/App.css'; 
import { MapView } from './components/MapView';
import EarthquakeCard from './components/EarthquakeCard';
import ParticleBackground from './components/ParticleBackground';
import NebulaBackground from './components/NebulaBackground';

interface Earthquake {
  id: string;
  place: string;
  magnitude: number;
  time: string;
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(response => response.json())
      .then(data => {
        const quakes = data.features.map((feature: any) => ({
          id: feature.id,
          place: feature.properties.place,
          magnitude: feature.properties.mag,
          time: new Date(feature.properties.time).toLocaleString(),
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }));
        setEarthquakes(quakes);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching earthquakes:', error));
  }, []);

  if (loading) return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)' }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <>
      <NebulaBackground />
      <div style={{
        background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
        minHeight: '100vh',
        padding: '30px',
        overflowX: 'hidden',
      }}>
        <div className="aurora-bg"></div>
        <ParticleBackground />

        <h1 className="text-center mb-4 text-light">🌎 Earthquake Visualizer</h1>

        {/* Filter Dropdown */}
        <div className="mb-5 text-center">
        <select
  className="form-select w-50 mx-auto"
  style={{
    background: 'rgba(255, 255, 255, 0.02)',  
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.1)',  
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: 'none',
  }}
  onFocus={(e) => {
    (e.target as HTMLSelectElement).style.background = 'rgba(255, 255, 255, 0.08)';
    (e.target as HTMLSelectElement).style.borderColor = '#8b5cf6';  // Purple glow
    (e.target as HTMLSelectElement).style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.5)';
  }}
  onBlur={(e) => {
    (e.target as HTMLSelectElement).style.background = 'rgba(255, 255, 255, 0.02)';
    (e.target as HTMLSelectElement).style.borderColor = 'rgba(255, 255, 255, 0.1)';
    (e.target as HTMLSelectElement).style.boxShadow = 'none';
  }}
  onChange={(e) => {
    const filter = parseFloat(e.target.value);
    if (filter === 0) {
      window.location.reload();
    } else {
      setEarthquakes(prev => prev.filter((eq: Earthquake) => eq.magnitude >= filter));
    }
  }}
>

            <option value="0">Show All Earthquakes</option>
            <option value="4">Magnitude 4.0+</option>
            <option value="5">Magnitude 5.0+</option>
          </select>
        </div>

        <MapView earthquakes={earthquakes} />

        
        <div className="row mt-5">
          {earthquakes.map((quake) => (
            <div key={quake.id} className="col-md-4 mb-4">
              <EarthquakeCard quake={quake} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
