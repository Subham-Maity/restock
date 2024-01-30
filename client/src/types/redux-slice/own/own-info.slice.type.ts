import { User } from "@/types/data/auth/auth.type";

export interface UserState {
  status: "idle" | "loading" | "failed";
  userInfo: User | null;
}
