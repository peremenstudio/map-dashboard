import React, { useState } from 'react';
import Map from './components/Map';
import Papa from 'papaparse';

function App() {
  const [geojsonData, setGeojsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const features = results.data
          .filter(row => row.latitude && row.longitude)
          .map(row => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
            },
            properties: row
          }));

        setGeojsonData({
          type: "FeatureCollection",
          features
        });
      }
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Map data={geojsonData} />
    </div>
  );
}

export default App;