import { Request } from 'express';

export interface Req extends Request {
  id: string,
  userData: any
}