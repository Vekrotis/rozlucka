
import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  className?: string;
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "", height = "400px" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // This is just a placeholder - in a real app you would use the Google Maps API
    // or an official embed link with your API key
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.7169730443624!2d12.937913812223034!3d50.09730787132081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0faf6faa21ca3%3A0x22ddb5b1685b7e00!2zTcOtcm92w6kgbsOhbS4gNzMzLCAzNjMgMDEgT3N0cm92IG5hZCBPaMWZw60!5e1!3m2!1scs!2scz!4v1716132036198!5m2!1scs!2scz"
        width="600"
        height={height}
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa školy"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
