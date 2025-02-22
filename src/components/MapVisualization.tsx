
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const MapVisualization = ({ data }) => {
  // Filter for entries with valid coordinates
  const markers = data
    .filter(item => item.decimalLatitude && item.decimalLongitude)
    .map(item => ({
      coordinates: [
        parseFloat(item.decimalLongitude),
        parseFloat(item.decimalLatitude)
      ],
      name: item.scientificName,
      date: item.eventDate
    }));

  return (
    <ComposableMap projection="geoAlbersUsa" width={800} height={400}>
      <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography 
              key={geo.rsmKey} 
              geography={geo} 
              fill="#DDD" 
              stroke="#FFF"
              style={{
                default: { outline: 'none' },
                hover: { outline: 'none', fill: '#F5F5F5' },
                pressed: { outline: 'none' }
              }}
            />
          ))
        }
      </Geographies>
      {markers.map((marker, i) => (
        <Marker key={i} coordinates={marker.coordinates}>
          <circle r={4} fill="#2ecc71" stroke="#fff" strokeWidth={1} />
          <text
            textAnchor="middle"
            y={-10}
            style={{ 
              fontFamily: "system-ui", 
              fill: "#5D5A6D", 
              fontSize: '8px',
              pointerEvents: 'none'
            }}
          >
            {marker.name.split(' ')[0]}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapVisualization;
