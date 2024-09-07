import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';

import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';

import { BookmarkService } from './bookmark.service';
import { BookmarkPatchDto, BookmarkPostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('all')
  getAllBookmarks() {
    return this.bookmarkService.getAllBookmarks();
  }

  @Get('mein')
  getMineBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getMineBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, id);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: User['id'],
    @Body() dto: BookmarkPostDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookmarkPatchDto,
  ) {
    return this.bookmarkService.editBookmark(userId, id, dto);
  }

  @Delete(':id')
  deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.deleteBookmark(userId, id);
  }
}
