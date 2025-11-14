import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { User } from '../types';

export type LoginRequest = { email: string; password: string };
export type SignupRequest = { firstName: string; lastName: string; email: string; password: string };

// Backend login returns access_token, expires_in, and a minimal user { id, email, role }
export type BackendLoginResponse = { access_token: string; expires_in: number; user: Pick<User, 'id' | 'email' | 'role'> };

export const authService = {
  async login(payload: LoginRequest) {
    const { data } = await http.post<BackendLoginResponse>(API.AUTH.LOGIN, payload);
    // Map to our client expectation: store token under 'token'
    return { token: data.access_token, user: data.user } as { token: string; user: User };
  },
  async signup(payload: SignupRequest) {
    // Register returns Created with minimal user info; we can perform a login afterward if needed.
    const { data } = await http.post(API.AUTH.SIGNUP, payload);
    return data;
  },
  async logout() {
    await http.post(API.AUTH.LOGOUT, {});
  },
};
