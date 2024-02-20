// types.d.ts

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
