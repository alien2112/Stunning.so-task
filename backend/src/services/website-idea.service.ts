import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebsiteIdea, WebsiteIdeaDocument } from '../schemas/website-idea.schema';
import { CreateWebsiteIdeaDto } from '../dto/create-website-idea.dto';
import { WebsiteIdeaResponseDto } from '../dto/website-idea-response.dto';
import { SectionGeneratorService } from './section-generator.service';

@Injectable()
export class WebsiteIdeaService {
  constructor(
    @InjectModel(WebsiteIdea.name) 
    private websiteIdeaModel: Model<WebsiteIdeaDocument>,
    private sectionGeneratorService: SectionGeneratorService,
  ) {}

  async create(createWebsiteIdeaDto: CreateWebsiteIdeaDto): Promise<WebsiteIdeaResponseDto> {
    // Generate sections based on the prompt
    const sections = this.sectionGeneratorService.generateSections(createWebsiteIdeaDto.prompt);
    
    const websiteIdea = new this.websiteIdeaModel({
      prompt: createWebsiteIdeaDto.prompt,
      sections,
    });

    const savedWebsiteIdea = await websiteIdea.save();
    
    return {
      _id: (savedWebsiteIdea._id as any).toString(),
      prompt: savedWebsiteIdea.prompt,
      sections: savedWebsiteIdea.sections,
      createdAt: savedWebsiteIdea.createdAt,
    };
  }

  async findAll(): Promise<WebsiteIdeaResponseDto[]> {
    const websiteIdeas = await this.websiteIdeaModel.find().sort({ createdAt: -1 }).exec();
    
    return websiteIdeas.map(idea => ({
      _id: (idea._id as any).toString(),
      prompt: idea.prompt,
      sections: idea.sections,
      createdAt: idea.createdAt,
    }));
  }

  async findOne(id: string): Promise<WebsiteIdeaResponseDto> {
    const websiteIdea = await this.websiteIdeaModel.findById(id).exec();
    
    if (!websiteIdea) {
      throw new NotFoundException(`Website idea with ID ${id} not found`);
    }

    return {
      _id: (websiteIdea._id as any).toString(),
      prompt: websiteIdea.prompt,
      sections: websiteIdea.sections,
      createdAt: websiteIdea.createdAt,
    };
  }

  async delete(id: string): Promise<void> {
    const result = await this.websiteIdeaModel.deleteOne({ _id: id }).exec();
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Website idea with ID ${id} not found`);
    }
  }
}
