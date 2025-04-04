
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get, Param, NotFoundException, BadRequestException, Delete, Put } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentService } from './comment.service';
import { ArticleService } from 'src/article/article.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCommentDto } from './comment.dto';


@Controller('comment')
export class CommentController {

    constructor(private commentService: CommentService, private articleService: ArticleService) { }
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/')
    @ApiBearerAuth()
    async createComment(@Body() body: CreateCommentDto, @Request() req) {
        const article = await this.articleService.findOne(body.articleId)

        if (!article) {
            throw new BadRequestException("ARTICLE_NOT_FOUND")
        }
        return this.commentService.createComment({
            comment: body.comment,

            article: {
                connect: {
                    id: body.articleId
                }
            },
            user: {
                connect: {
                    id: req.user.id
                }
            }


        })

    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    @ApiBearerAuth()
    async findComment(@Param("id") id: string) {
        const comment = await this.commentService.findOne(parseInt(id))

        if (!comment) {
            throw new NotFoundException()
        }

        return comment
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/')
    @ApiBearerAuth()
    async findMany(@Param("id") id: string, @Request() req) {
        return await this.commentService.findMany(req.user.id)
    }


    @UseGuards(AuthGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    delete(@Param("id") id: string) {
        return this.commentService.delete(parseInt(id))
    }
    @UseGuards(AuthGuard)
    @Put('/:id')
    @ApiBearerAuth()
    async update(@Param("id") id: string, @Body() commentDto: Record<string, any>) {

        const comment = await this.commentService.findOne(parseInt(id))

        if (!comment) {
            throw new NotFoundException()
        }

        return this.commentService.update(parseInt(id), commentDto)
    }



}
