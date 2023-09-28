export interface User {
  email: string;
  password?: string;
  id?: number;
  addresses: Address[];
  role: string;
}

export interface Address {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
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
  error: any;
}
