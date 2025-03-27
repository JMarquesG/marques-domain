import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import { LanguageProvider } from "./context/LanguageContext";



const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return minimal structure during SSR to prevent hydration errors
  if (!isMounted) {
    return null;
  }

  return (
      <LanguageProvider>
        <TooltipProvider>
          <Index />
        </TooltipProvider>
      </LanguageProvider>
  );
};

export default App;
