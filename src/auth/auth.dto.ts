import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty()
    password: string;

    @ApiProperty()
    username: string;
}


export class SignUpDto {
    @ApiProperty()
    password: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    name: string;
}

export class AuthControllerForgotPasswordBodyRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
}

export class AuthControllerChangePasswordBodyRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}