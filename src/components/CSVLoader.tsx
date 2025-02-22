import React, { useEffect } from 'react';
import Papa from 'papaparse';

const CSVLoader = ({ csvFilePath, onDataLoaded }) => {
  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        onDataLoaded(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV: ", error);
      },
    });
  }, [csvFilePath, onDataLoaded]);

  return <div>Loading data...</div>;
};

export default CSVLoader;