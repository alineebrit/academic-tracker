import { UserRole } from "./role";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
}
