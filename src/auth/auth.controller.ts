import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: any) {
    return { message: await this.authService.signup(signupDto) };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return { message: await this.authService.login(loginDto) };
  }
}
