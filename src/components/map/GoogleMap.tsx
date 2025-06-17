
import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  className?: string;
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "", height = "400px" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (mapRef.current && iframeRef.current) {
      iframeRef.current.style.width = "100%";
      iframeRef.current.style.height = height;
      iframeRef.current.style.border = "0";
      iframeRef.current.style.borderRadius = "12px";
    }
  }, [height]);

  return (
    <div ref={mapRef} className={`w-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAj0_j83t1KGFYSDZPgOxyNSXkqnaCZGSQ&center=50.3057,12.9397&zoom=18&maptype=satellite`}
        width="600"
        height={height}
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Zámecký park 224, 363 01 Ostrov nad Ohří"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
