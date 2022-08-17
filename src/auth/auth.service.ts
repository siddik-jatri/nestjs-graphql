import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { SignupInput } from "./dto/signup.input";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/schema/user.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email: username });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user._id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  signup(signupInput: SignupInput) {
    return this.userService.create(signupInput)
  }
}
