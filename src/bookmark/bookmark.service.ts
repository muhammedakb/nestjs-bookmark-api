import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { BookmarkPatchDto, BookmarkPostDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getAllBookmarks() {
    const bookmarks = await this.prisma.bookmark.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    if (!bookmarks || bookmarks.length === 0) {
      throw new NotFoundException('No bookmarks found to list.');
    }

    return bookmarks;
  }

  async getMineBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: { updatedAt: 'desc' },
    });

    if (!bookmarks || bookmarks.length === 0) {
      throw new NotFoundException('No bookmarks found to list.');
    }

    return bookmarks;
  }

  async getBookmarkById(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found!');
    }

    return bookmark;
  }

  async createBookmark(userId: number, dto: BookmarkPostDto) {
    const createdBookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return createdBookmark;
  }

  async editBookmark(userId: number, id: number, dto: BookmarkPatchDto) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id,
        },
      });

      if (!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }

      const updatedBookmark = await this.prisma.bookmark.update({
        where: {
          id,
        },
        data: { ...dto },
      });

      return { ...updatedBookmark, message: 'Update operation successful' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Bookmark not found!');
      }
      throw error;
    }
  }

  async deleteBookmark(userId: number, id: number) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id,
        },
      });

      if (!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }

      const deletedBookmark = await this.prisma.bookmark.delete({
        where: { id },
      });

      return { ...deletedBookmark, message: 'Delete operation successful' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Bookmark not found!');
      }
      throw error;
    }
  }
}
