// src/components/MapVisualization.js
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// Dummy geocoding lookup – expand as needed
const getCoordinates = (location) => {
  const mapping = {
    "Richmond, VA": [-77.4360, 37.5407],
    "Lynchburg, VA": [-79.1423, 37.4138],
    "New Kent County": [-76.7, 37.4],
    "Not indicated": [0, 0]
  };
  return mapping[location] || [0, 0];
};

const MapVisualization = ({ data }) => {
  // Create markers from data
  const markers = data.map(item => {
    const coords = getCoordinates(item["Owner's Location"]);
    return {
      name: item["Owner of Runaway"],
      coordinates: coords,
      action: item["Action Taken"]
    };
  });

  return (
    <ComposableMap projection="geoAlbersUsa" width={800} height={400}>
      <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />
          ))
        }
      </Geographies>
      {markers.map((marker, i) => (
        <Marker key={i} coordinates={marker.coordinates}>
          <circle r={5} fill="#F00" />
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: '10px' }}
          >
            {marker.name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapVisualization;