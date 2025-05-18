
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
        src="https://www.google.com/maps/embed?pb=!4v1717673115122!6m8!1m7!1sJSkLRu9ITSFZe_hOtVr70Q!2m2!1d50.3093061293358!2d12.9483689239505!3f276.56!4f0!5f0.7820865974627469"
        width="600"
        height={height}
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa města Ostrov nad Ohří"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
