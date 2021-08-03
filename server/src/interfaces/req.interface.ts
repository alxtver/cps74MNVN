import { Request } from 'express';
export interface IRequest extends Request {
  csrfToken: () => string;
  session: any;
}
