
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from "./pages/Index";
import Program from "./pages/Program";
import Info from "./pages/Info";
import Galerie from "./pages/Galerie";
import Trida from "./pages/Trida";
import Vzpominky from "./pages/Vzpominky";
import Pozvanka from "./pages/Pozvanka";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/program" element={<Program />} />
            <Route path="/info" element={<Info />} />
            <Route path="/trida" element={<Trida />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/vzpominky" element={<Vzpominky />} />
            <Route path="/pozvanka" element={<Pozvanka />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
