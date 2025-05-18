
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.0464514531966!2d12.937176876454414!3d50.31058347156378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0fb359914ce41%3A0x27e841d34356d95d!2sZ%C3%A1kladn%C3%AD%20%C5%A1kola%20a%20Mate%C5%99sk%C3%A1%20%C5%A1kola%20Ostrov%2C%20Myslbekova%20996%2C%20p%C5%99%C3%ADsp%C4%9Bvkov%C3%A1%20organizace!5e0!3m2!1scs!2scz!4v1715982047202!5m2!1scs!2scz"
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
