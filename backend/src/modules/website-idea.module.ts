import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteIdea, WebsiteIdeaSchema } from '../schemas/website-idea.schema';
import { WebsiteIdeaController } from '../controllers/website-idea.controller';
import { WebsiteIdeaService } from '../services/website-idea.service';
import { SectionGeneratorService } from '../services/section-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebsiteIdea.name, schema: WebsiteIdeaSchema },
    ]),
  ],
  controllers: [WebsiteIdeaController],
  providers: [WebsiteIdeaService, SectionGeneratorService],
  exports: [WebsiteIdeaService],
})
export class WebsiteIdeaModule {}
