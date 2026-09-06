import { create } from "zustand";

type AuthStore = {
    accessToken: string;
    isAuthReady: boolean;
    setAccessToken: (accessToken: string) => void;
    finishAuth: () => void;
    clearAuth: () => void;
};

// access token은 브라우저 저장소가 아니라 메모리에만 보관해요.
// 새로고침하면 AuthRestore가 refresh token 쿠키로 새 토큰을 받아요.
export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: "",
    isAuthReady: false,
    setAccessToken: (accessToken) => set({ accessToken, isAuthReady: true }),
    finishAuth: () => set({ isAuthReady: true }),
    clearAuth: () => set({ accessToken: "", isAuthReady: true }),
}));
