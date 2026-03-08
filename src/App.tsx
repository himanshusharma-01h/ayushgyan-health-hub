import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import DoctorPatients from "./pages/dashboard/DoctorPatients";
import DoctorAppointments from "./pages/dashboard/DoctorAppointments";
import DoctorPrescriptions from "./pages/dashboard/DoctorPrescriptions";
import PrakritiQuiz from "./pages/dashboard/PrakritiQuiz";
import DailyRituals from "./pages/dashboard/DailyRituals";
import Appointments from "./pages/dashboard/Appointments";
import SymptomsChecker from "./pages/dashboard/SymptomsChecker";
import UserProfile from "./pages/dashboard/UserProfile";
import Chat from "./pages/Chat";
import Products from "./pages/Products";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAdvice from "./pages/admin/AdminAdvice";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/patient/prakriti" element={<ProtectedRoute><PrakritiQuiz /></ProtectedRoute>} />
              <Route path="/dashboard/patient/rituals" element={<ProtectedRoute><DailyRituals /></ProtectedRoute>} />
              <Route path="/dashboard/patient/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="/dashboard/patient/symptoms" element={<ProtectedRoute><SymptomsChecker /></ProtectedRoute>} />
              <Route path="/dashboard/patient/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/dashboard/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/doctor/patients" element={<ProtectedRoute><DoctorPatients /></ProtectedRoute>} />
              <Route path="/dashboard/doctor/appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
              <Route path="/dashboard/doctor/prescriptions" element={<ProtectedRoute><DoctorPrescriptions /></ProtectedRoute>} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute requireAdmin><AdminProducts /></ProtectedRoute>} />
              <Route path="/admin/advice" element={<ProtectedRoute requireAdmin><AdminAdvice /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/subscribers" element={<ProtectedRoute requireAdmin><AdminSubscribers /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
