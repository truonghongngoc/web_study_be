import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto{
    @ApiProperty()
    title:string;
    @ApiProperty()
    content:string
    // @ApiProperty()
    // articleId:number

}
export class CreateCategoryDto{
    @ApiProperty()
    name:string
}