import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWebsiteIdeaDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Website idea must be at least 10 characters long' })
  @MaxLength(500, { message: 'Website idea must not exceed 500 characters' })
  prompt: string;
}
