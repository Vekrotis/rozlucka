
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
        src={`https://www.google.com/maps/embed?pb=!4v1750200691358!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQy15ZTYwcHdF!2m2!1d50.30189722197134!2d12.94027713661501!3f178.49665572185455!4f10.833594866182864!5f0.4000000000000002&hl=cs&key=AIzaSyAj0_j83t1KGFYSDZPgOxyNSXkqnaCZGSQ`}
        width="600"
        height={height}
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Zámecký park 224, 363 01 Ostrov nad Ohří"
      />
      <div style={{ marginTop: "8px", textAlign: "center", color: "#555" }}>
        <span>Zámecký park 224, 363 01 Ostrov</span>
      </div>
    </div>
  );
};

export default GoogleMap;
