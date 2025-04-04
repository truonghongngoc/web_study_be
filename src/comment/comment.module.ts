import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma.service';
import { ArticleService } from 'src/article/article.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService,PrismaService,ArticleService]
})
export class CommentModule {}
