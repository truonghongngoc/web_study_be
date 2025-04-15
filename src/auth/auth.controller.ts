
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthControllerChangePasswordBodyRequest, AuthControllerForgotPasswordBodyRequest, SignInDto, SignUpDto } from './auth.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailerService } from '@nestjs-modules/mailer';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService, private jwtService: JwtService, private readonly mailerService: MailerService) { }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiBearerAuth()
  signIn(@Body() signInDto: SignInDto) {

    return this.authService.signIn(signInDto.username, signInDto.password);


  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @ApiBearerAuth()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.name);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @ApiResponse({
    status: 200,
  })
  @Post('/forgot-password')
  async forgotPassword(
    @Body() body: AuthControllerForgotPasswordBodyRequest,
  ): Promise<void> {
    const { email } = body;

    const userSchema = await this.userService.findOne({
      email,
    });

    if (!userSchema) {
      throw new BadRequestException();
    }

    const payload = { id: userSchema.id };

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    const FORGOT_PASSWORD_URL = `http://localhost:5173/reset?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password',
      text: 'Forgot Password',
      html: `<b>Forgot Password : ${FORGOT_PASSWORD_URL}</b>`,
    })
  }


  @ApiResponse({
    status: 200,
  })
  @Patch('/change-password')
  async changePassword(
    @Body() body: AuthControllerChangePasswordBodyRequest,
  ): Promise<void> {
    const { token, password } = body;

    const payloadSignUp = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    if (!payloadSignUp) {
      throw new BadRequestException();
    }


    const userSchema = await this.userService.updateUser({
      where: { id: payloadSignUp.id },
      data: {
        password,
      },
    });

    if (!userSchema) {
      throw new BadRequestException();
    }
  }
}

