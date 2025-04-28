import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { LatLngTuple, LeafletMouseEvent, Map } from 'leaflet';
import L from 'leaflet';

interface Earthquake {
  id: string;
  place: string;
  magnitude: number;
  time: string;
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  earthquakes: Earthquake[];
}

export const MapView: React.FC<MapViewProps> = ({ earthquakes }) => {
  const [mousePosition, setMousePosition] = useState<LatLngTuple | null>(null);
  const mapRef = useRef<Map | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      {mousePosition && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 12px',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          zIndex: 1000
        }}>
          Lat: {mousePosition[0].toFixed(2)}, Lng: {mousePosition[1].toFixed(2)}
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{
          height: "80vh",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
        ref={mapRef}
        whenReady={() => {
          setTimeout(() => {
            if (mapRef.current) {
              mapRef.current.on('mousemove', (e: LeafletMouseEvent) => {
                setMousePosition([e.latlng.lat, e.latlng.lng]);
              });
            }
          }, 1000);
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {earthquakes.map(eq => (
          <CircleMarker
            key={eq.id}
            center={[eq.latitude, eq.longitude] as LatLngTuple}
            radius={eq.magnitude * 2}
            pathOptions={{
              color:
                eq.magnitude >= 5 ? 'red' :
                eq.magnitude >= 3 ? 'orange' :
                'green'
            }}
          >
            <Popup>
              <b>{eq.place}</b><br />
              Magnitude: {eq.magnitude}<br />
              Time: {eq.time}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
