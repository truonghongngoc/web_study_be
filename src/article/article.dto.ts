import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto{
    @ApiProperty()
    title:string

    @ApiProperty()
    content:string
  
}
export class CreateArticleDto {
  
    @ApiProperty()
    title:string

    @ApiProperty()
    content:string

  

    @ApiProperty()
    categoryId:number
}