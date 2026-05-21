import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/chat/ChatWidget";

import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import MarketsPage from "@/pages/MarketsPage";
import PortfolioPage from "@/pages/PortfolioPage";
import CalculatorPage from "@/pages/CalculatorPage";
import SupportPage from "@/pages/SupportPage";
import PackagesPage from "@/pages/PackagesPage";
import DeveloperPage from "@/pages/DeveloperPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        
        {/* Authenticated Routes wrapped in a layout */}
        <Route path="/dashboard" component={() => <><Navbar /><DashboardPage /></>} />
        <Route path="/markets" component={() => <><Navbar /><MarketsPage /></>} />
        <Route path="/portfolio" component={() => <><Navbar /><PortfolioPage /></>} />
        <Route path="/calculator" component={() => <><Navbar /><CalculatorPage /></>} />
        <Route path="/support" component={() => <><Navbar /><SupportPage /></>} />
        <Route path="/packages" component={() => <><Navbar /><PackagesPage /></>} />
        <Route path="/developer" component={() => <><Navbar /><DeveloperPage /></>} />
        
        {/* Default route redirect to login/dashboard handled by AuthGuard implicitly if root is accessed */}
        <Route path="/" component={() => {
          window.location.href = '/dashboard';
          return null;
        }} />

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AuthGuard>
                <Router />
                <ChatWidget />
              </AuthGuard>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
