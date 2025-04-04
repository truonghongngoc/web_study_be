import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService, CategoryService]
})
export class ArticleModule { }
