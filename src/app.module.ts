import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, UsersModule, ArticleModule, CommentModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
