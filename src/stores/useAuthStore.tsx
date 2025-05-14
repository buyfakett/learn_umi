import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  username: string | null;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      setToken: (token) => set({ token }),
      setUsername: (username) => set({ username }),
      logout: () => set({ token: null, username: null }),
    }),
    {
      name: 'auth',
      partialize: (state) => ({ token: state.token, username: state.username }),
    }
  )
);
