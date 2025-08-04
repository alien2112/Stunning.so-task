export class SectionDto {
  id: string;
  name: string;
  description: string;
  type: string;
}

export class WebsiteIdeaResponseDto {
  _id: string;
  prompt: string;
  sections: SectionDto[];
  createdAt: Date;
}
