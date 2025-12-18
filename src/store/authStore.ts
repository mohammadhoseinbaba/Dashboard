import { create } from "zustand";
import type { User } from "../api/types";
import { setAccessToken } from "../api/http";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (payload: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: ({ user, accessToken }) => {
    setAccessToken(accessToken); // sets token in http.ts
    set({
      user,
      accessToken,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    setAccessToken(null);
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
