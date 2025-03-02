import api from "./api";

export async function login(username: string, password: string) {
  try {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userId", response.data.id);
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login", error);
    throw error;
  }
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function removeUserId() {
  localStorage.removeItem("userId");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function isAuthenticated() {
  return !!getToken();
}
