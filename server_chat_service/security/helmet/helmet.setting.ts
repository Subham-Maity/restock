export const helmet_rate_limit_windowMs = 5 * 60 * 1000; // 5 minutes

export const helmet_rate_limit_message = `Too many requests from this IP, please try again in ${
  helmet_rate_limit_windowMs / 1000 / 60
} minutes`;

export const helmet_rate_limit_max = 500000; // limit each IP to 100 requests per windowMs
