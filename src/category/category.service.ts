import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Đường dẫn đến PrismaService
import { Prisma, Category } from '@prisma/client'; // Import type Category

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({
            data, // Prisma sẽ tự động map dữ liệu vào các field của Category
        });
    }
    async findOne(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }
    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category | null> {
        return this.prisma.category.update({
            where: { id },
            data: data
        });
    }
    async delete(id: number): Promise<Category | null> {
        return this.prisma.category.delete({
            where: { id },
        });
    }

}