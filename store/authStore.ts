import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/api/types";
import { AuthAPI, LoginCredentials, RegisterData } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const credentials: LoginCredentials = { email, password };
          const response = await AuthAPI.login(credentials);

          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              refreshToken: response.data.refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            console.error("Login failed:", response.error);
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });

        try {
          const response = await AuthAPI.register(userData);

          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              refreshToken: response.data.refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            console.error("Registration failed:", response.error);
            return false;
          }
        } catch (error) {
          console.error("Registration error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: async () => {
        const { token } = get();

        try {
          if (token) {
            await AuthAPI.logout(token);
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      refreshAuth: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          return false;
        }

        try {
          const response = await AuthAPI.refreshToken(refreshToken);

          if (response.success && response.data) {
            set({
              token: response.data.token,
            });
            return true;
          } else {
            // Refresh token is invalid, logout user
            get().logout();
            return false;
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          get().logout();
          return false;
        }
      },

      updateProfile: async (updates: Partial<User>) => {
        const { token, user } = get();

        if (!token || !user) {
          return false;
        }

        set({ isLoading: true });

        try {
          const response = await AuthAPI.updateProfile(token, updates);

          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            console.error("Profile update failed:", response.error);
            return false;
          }
        } catch (error) {
          console.error("Profile update error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "otica-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
