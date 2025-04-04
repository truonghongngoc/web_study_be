import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticleService {

    constructor(private prisma: PrismaService) { }

    async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
        return this.prisma.article.create({
            data,
        });
    }

    async findOne(id: number): Promise<Article | null> {
        return this.prisma.article.findUnique({
            where: { id },
        });
    }

    async findMany(skip?: number, take?: number): Promise<Article[]> {
        return this.prisma.article.findMany({
            skip,
            take,
        });
    }

    async update(id: number, data: Prisma.ArticleUpdateInput): Promise<Article | null> {
        return this.prisma.article.update({
            where: { id },
            data: data
        });
    }

    async delete(id: number): Promise<Article | null> {
        return this.prisma.article.delete({
            where: { id },
        });
    }
}
