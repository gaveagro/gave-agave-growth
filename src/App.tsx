
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import HijuelosEspadin from "./pages/HijuelosEspadin";
import InversionImpacto from "./pages/InversionImpacto";
import BonosCarbono from "./pages/BonosCarbono";
import Vivero from "./pages/Vivero";
import Compensa from "./pages/Compensa";
import Crowdgrowing from "./pages/Crowdgrowing";

// Admin is loaded on demand so Supabase stays out of the public/prerendered bundle.
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

const queryClient = new QueryClient();

const AppWithAnalytics = () => {
  useAnalytics();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/inversion-de-impacto" element={<InversionImpacto />} />
      <Route path="/bonos-de-carbono" element={<BonosCarbono />} />
      <Route path="/vivero" element={<Vivero />} />
      <Route path="/compensa" element={<Compensa />} />
      <Route path="/crowdgrowing" element={<Crowdgrowing />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <AdminPanel />
          </Suspense>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/hijuelos-espadin" element={<HijuelosEspadin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AppWithAnalytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
