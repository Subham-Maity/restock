export interface User {
  email: string;
  password?: string;
  id?: number;
}

export interface UserResponse {
  data: any;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface AuthState {
  loggedInUser: User | null;
  status: "idle" | "loading";
  error: string | null;
}
