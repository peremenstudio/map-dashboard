import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBlcmVtZW4iLCJhIjoiY2p2M2g3N2Y4MDk2bDRlcDJ2Y3R0dnNocCJ9.oMUpX3SDvmCFGW1o9qkzoQ';

const Map = ({ data }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    if (mapRef.current && data) {
      if (mapRef.current.getSource('points')) {
        mapRef.current.getSource('points').setData(data);
      } else {
        mapRef.current.addSource('points', {
          type: 'geojson',
          data,
        });
        mapRef.current.addLayer({
          id: 'points',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-radius': 6,
            'circle-color': '#007cbf',
          },
        });
      }
    }
  }, [data]);

  return <div ref={mapContainerRef} style={{ height: '90vh', width: '100%' }} />;
};

export default Map;