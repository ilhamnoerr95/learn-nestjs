import { z } from 'zod';

export class LoginUserReq {
  username: string;
  password: string;
}

// exeption filter
export const loginUserReqValidation = z.object({
  username: z.string().min(5).max(15),
  password: z.string().min(5).max(15),
});
