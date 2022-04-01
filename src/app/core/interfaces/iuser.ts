export interface IUser {
  id?: number;
  name: string;
  email: string;
  password? : string;
  password_confirmation? : string;
  email_verified_at?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}
