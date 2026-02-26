import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import VerifyEmailPage from './pages/SendVerifyEmailPage';
import CreateAffixPage from './pages/admin/createAffix';
import CreateStatPage from './pages/admin/CreateStatPage';
import CreateBaseAffixPage from './pages/admin/CreateBaseAffixPage';
import { Toaster } from '@/components/ui/sonner';
import { PublicRoute } from './components/PublicRoute';
import CreateItemBasePage from './pages/admin/CreateItemBasePage';
export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUpPage></SignUpPage>
                </PublicRoute>
              }
            />
            <Route path="/send-verify-email" element={<VerifyEmailPage />} />
            <Route path="/admin/create-affix" element={<CreateAffixPage />} />
            <Route path="/admin/create-stat" element={<CreateStatPage />} />
            <Route
              path="/admin/create-item-base"
              element={<CreateItemBasePage />}
            />
            <Route
              path="/admin/create-base-affix"
              element={<CreateBaseAffixPage />}
            />
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
