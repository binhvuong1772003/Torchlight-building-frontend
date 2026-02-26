import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import axiosClient, { tokenService } from '@/api/axiosClient';
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/types/auth';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  sendEmailVerification: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      let token = tokenService.getAccess();

      if (!token) {
        // Thử dùng refreshToken trong cookie để lấy accessToken mới
        try {
          const { data } = await axiosClient.post<{ data: string }>(
            'auth/refresh-token'
          );
          tokenService.setToken(data.data);
          token = data.data;
        } catch {
          setLoading(false);
          return; // Không có cả 2 → chưa login
        }
      }

      try {
        const { data } = await axiosClient.get<{
          success: boolean;
          data: User;
        }>('auth/me');
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  const sendEmailVerification = useCallback(async (email: string) => {
    await axiosClient.post('auth/send-verification-email', { email });
  }, []);
  const login = useCallback(async (credentials: LoginRequest) => {
    const { data } = await axiosClient.post<AuthResponse>(
      'auth/login',
      credentials
    );
    tokenService.setToken(data.accessToken);
    setUser(data.user);
  }, []);
  const signup = useCallback(
    async (credentials: LoginRequest) => {
      const { data } = await axiosClient.post<AuthResponse>(
        'auth/register',
        credentials
      );
      tokenService.setToken(data.accessToken);
      setUser(data.user);
      await sendEmailVerification(credentials.email); // ← truyền email trực tiếp
    },
    [sendEmailVerification]
  );
  const logout = useCallback(async () => {
    try {
      await axiosClient.post('auth/logout');
    } catch {}
    tokenService.clear();
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, sendEmailVerification }}
    >
      {children}
    </AuthContext.Provider>
  );
};
