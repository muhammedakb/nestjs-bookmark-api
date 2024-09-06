import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  editUser(@GetUser('id') userId: User['id'], @Body() dto: UserDto) {
    const values = Object.values(dto);
    const hasAnyEmptyValue = values.length === 0;

    if (hasAnyEmptyValue) {
      throw new BadRequestException('You did not enter any values.');
    }

    return this.userService.editUser(userId, dto);
  }
}
