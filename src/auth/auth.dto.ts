import { ApiProperty } from "@nestjs/swagger";

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