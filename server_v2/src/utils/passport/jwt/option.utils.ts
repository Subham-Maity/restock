//JWT Options
import { ExtractJwt } from "passport-jwt";

export const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET_KEY",
};
