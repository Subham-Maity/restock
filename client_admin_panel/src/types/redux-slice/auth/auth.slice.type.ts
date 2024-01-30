import { User } from "@/types/data/auth/auth.type";

export interface AuthState {
  loggedInUserToken: User | null;
  status: "idle" | "loading";
  error: any;
}
