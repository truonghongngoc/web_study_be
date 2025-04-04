
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Param, Get, NotFoundException, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryDto, CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @Post('/')
    createCategory(@Body() body: CreateCategoryDto, @Request() req) {

        return this.categoryService.createCategory({
            name: body.name,
        })

    }
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @Get('/:id')
    async findCategory(@Param("id") id: string) {
        const category = await this.categoryService.findOne(parseInt(id))
        if (!category) {
            throw new NotFoundException()

        }
        return category

    }
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    @ApiBearerAuth()
    async update(@Param("id") id: string, @Body() categoryDto: Record<string, any>) {
        const category = await this.categoryService.findOne(parseInt(id))
        if (!category) {
            throw new NotFoundException()
        }
        return this.categoryService.update(parseInt(id), categoryDto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    @ApiBearerAuth()
    delte(@Param("id") id: string) {
        return this.categoryService.delete(parseInt(id))

    }
}
