import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    accessToken: string;
    refreshToken: string;
    profile: any;
  };
}
