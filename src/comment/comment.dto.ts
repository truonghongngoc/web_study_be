import { ApiProperty } from "@nestjs/swagger";

export class CommentDto{
    @ApiProperty()
    comment:string

    @ApiProperty()
   articleId:number
}
export class CreateCommentDto{
    @ApiProperty()
    comment:string
    @ApiProperty()
    articleId:number

}