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
  dpUrl?: string;
}

export interface UserResponse {
  data: any;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface AuthState {
  loggedInUserToken: User | null;
  status: "idle" | "loading";
  error: any;
}
