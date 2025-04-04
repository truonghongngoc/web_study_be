import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) {}

      @UseGuards(AuthGuard)
      //  @UseGuards(AuthGuard)
        @ApiBearerAuth()
      @Get('/my-user')
      getMyUser(@Request() req) {

        return this.userService.findOne({id : req.user.id})
      }
      

}
