// Sanitize user object by removing password and salt

export const sanitizeUser = (user: any): { id: string; role: string } => {
  return { id: user.id, role: user.role };
};
