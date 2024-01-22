import passport from "passport";

//use for protected routes
export const isAuth = passport.authenticate("jwt", { session: false });
