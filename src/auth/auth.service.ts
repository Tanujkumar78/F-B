import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(signupDto: any): Promise<any> {
    const { Fullname, Email, passwordd, Cpasswordd } = signupDto;

    // Check for empty fields
    if (!Fullname || !Email || !passwordd || !Cpasswordd) {
      throw new BadRequestException('Fill all the details as mentioned above');
    }

    // Email format check
    if (!Email.endsWith('@gmail.com') || Email.startsWith('@gmail.com')) {
      throw new BadRequestException('Only valid @gmail.com emails are allowed!');
    }

    // Password match check
    if (passwordd !== Cpasswordd) {
      throw new BadRequestException('Password and Confirmed password should be same.');
    }

    // Existing user check
    const existingUser = await this.userModel.findOne({ Email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwordd, 10);

    // Save new user
    const newUser = new this.userModel({
      Fullname,
      Email,
      passwordd: hashedPassword,
    });

    await newUser.save();
    return 'Signup successful!';
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    // Find user by fullname
    const user = await this.userModel.findOne({ Fullname: username });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordd);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    return {message: 'Login successful!', user};
  }
}
