
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.email };
    return {
      access_token:await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    pass: string,
    name?: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: username });

    if (user) {
      throw new UnauthorizedException();
    }

    const newUser = await this.usersService.createUser({ name, password: pass, email: username })

    const payload = { id: newUser.id, username: newUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
