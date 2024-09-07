import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { IsEmptyObjectPipe } from './pipes';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  editUser(
    @GetUser('id') userId: User['id'],
    @Body(IsEmptyObjectPipe) dto: UserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
