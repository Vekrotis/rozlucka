
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import GradientButton from "@/components/ui/GradientButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Just log the non-existent route without showing stack trace
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="blob-effect"></div>
      <div className="blob-effect" style={{ left: '60vw', animationDelay: '-5s' }}></div>
      
      <div className="text-center glass p-8 rounded-2xl max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-gray-700 mb-6">Ups! Tato stránka neexistuje</p>
        <p className="text-gray-600 mb-8">
          Zdá se, že jste se dostali na stránku, která neexistuje nebo byla přesunuta.
        </p>
        <GradientButton to="/" variant="primary" size="lg">
          Zpět na hlavní stránku
        </GradientButton>
      </div>
    </div>
  );
};

export default NotFound;
