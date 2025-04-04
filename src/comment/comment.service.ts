import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
        return this.prisma.comment.create({
            data,
        });
    }
    async findOne(id: number): Promise<Comment | null> {
        return this.prisma.comment.findUnique({
            where: { id },
        });
    }

    async findMany(userId: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: { userId },
        });
    }
    async delete(id: number): Promise<Comment | null> {
        return this.prisma.comment.delete({
            where: { id },
        });
    }
    async update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment | null> {
        return this.prisma.comment.update({
            where: { id },
            data: data
        });
    }
}


