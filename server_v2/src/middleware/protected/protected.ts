import passport from "passport";

export const isAuth = passport.authenticate("jwt", { session: false });
