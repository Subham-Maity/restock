export interface User {
  email: string;
  password?: string;
  id?: number;
  addresses: Address[];
  role: string;
  userInfo: any;
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
