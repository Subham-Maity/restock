// Sanitize a user object by removing password and salt

export const sanitizeUser = (user: any): { id: string; role: string } => {
  if (!user.id || !user.role) {
    throw new Error("User ID or role is undefined");
  }
  return { id: user.id, role: user.role };
};
