import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string; // Will be Fullname in DB

  @IsNotEmpty()
  password: string;
}
