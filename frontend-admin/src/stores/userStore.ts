import { writable } from "svelte/store";
import { apiLogin, apiLogout } from "../services/api";

// 定義使用者狀態介面
export interface UserState {
    token: string | null;
    isLoggedIn: boolean;
}

// 建立 store，並設定預設值
export const userStore = writable<UserState>({
    token: localStorage.getItem("jwt") || null,
    isLoggedIn: !!localStorage.getItem("jwt"),
});

// ✅ 處理登入並更新狀態
export async function login(username: string, password: string): Promise<void> {
    const data = await apiLogin(username, password); // 🔄 調用 API 登入
    if (data.token) {
        userStore.set({ token: data.token, isLoggedIn: true });
    }
}

// ✅ 處理登出並清除狀態
export async function logout(): Promise<void> {
    const data = await apiLogout(); // ✅ 等待 API 回應
    if (data.success) {
        userStore.set({ token: null, isLoggedIn: false });
    }
}
