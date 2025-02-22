
import React, { useEffect } from 'react';
import Papa from 'papaparse';

const CSVLoader = ({ csvFilePath, onDataLoaded }) => {
  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // Filter out rows with missing essential data
        const cleanData = results.data.filter(row => 
          row.scientificName && 
          row.family && 
          row.genus && 
          row.species
        );
        onDataLoaded(cleanData);
      },
      error: (error) => {
        console.error("Error parsing CSV: ", error);
      },
    });
  }, [csvFilePath, onDataLoaded]);

  return <div>Loading herbarium data...</div>;
};

export default CSVLoader;
