import { CategoryService } from './../category/category.service';
import { Category } from '@prisma/client';
import { Body, Controller,Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateArticleDto } from './article.dto';

@Controller('articles')
export class ArticleController {

    constructor(private articleService: ArticleService, private categoryService: CategoryService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/')
    @ApiBearerAuth()
    async createArticle (@Body() body: CreateArticleDto, @Request() req) {
        const category = await this.categoryService.findOne(body.categoryId)
        if (!category) {
            throw new BadRequestException("CATEGORY_NOT_FOUND")
        }
        return this.articleService.createArticle({
            title: body.title,
            content: body.content,
            category: {
                connect: {
                    id: body.categoryId
                }
            },
        })
        // return this.articleService.createArticle(CreateArticleDto.title,)
    }
    // return this.authService.signIn(signInDto.username, signInDto.password);


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    async findOne(@Param("id") id: string) {
        const article = await this.articleService.findOne(parseInt(id))

        if (!article) {
            throw new NotFoundException()
        }

        return article
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('/:id')
    async findMany(@Param("id") id: string) {
        const articles = await this.articleService.findMany()
        return articles
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Put('/:id')
    async update(@Param("id") id: string, @Body() articleDto: Record<string, any>) {

        const article = await this.articleService.findOne(parseInt(id))

        if (!article) {
            throw new NotFoundException()
        }

        return this.articleService.update(parseInt(id), articleDto)
    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    delte(@Param("id") id: string) {
        return this.articleService.delete(parseInt(id))
    }
}
