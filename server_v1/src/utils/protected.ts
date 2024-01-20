import passport from 'passport';
export const isAuth = passport.authenticate('jwt', { session: false });

export const sanitizeUser = (user: any): { id: string, role: string } => {
    return { id: user.id, role: user.role };
};
