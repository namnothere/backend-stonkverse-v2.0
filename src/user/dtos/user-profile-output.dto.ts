import { Expose } from 'class-transformer';

export class UserProfileOutput {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  code: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  parent_id: string;

  @Expose()
  full_name: string;

  @Expose()
  phone: string;

  @Expose()
  verification_code: string;

  @Expose()
  avatar: string;

  @Expose()
  role: string;
}
