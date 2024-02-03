//JWT Options
import { cookieExtractor } from "../cookie/cookie_extractor";

export const opts = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: cookieExtractor,
  secretOrKey: "SECRET_KEY",
};
