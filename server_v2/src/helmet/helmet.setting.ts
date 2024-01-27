export const helmet_rate_limit_windowMs = 15 * 60 * 1000; // 15 minutes

export const helmet_rate_limit_message = `Too many requests from this IP, please try again in ${helmet_rate_limit_windowMs / 1000 / 60} minutes`;

export const helmet_rate_limit_max = 1000; // limit each IP to 100 requests per windowMs


