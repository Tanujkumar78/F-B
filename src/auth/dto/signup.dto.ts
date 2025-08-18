import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  Fullname: string;

  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @MinLength(6)
  passwordd: string;

  @IsNotEmpty()
  Cpasswordd: string;
}
