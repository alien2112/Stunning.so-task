import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
  Logger,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { WebsiteIdeaService } from '../services/website-idea.service';
import { SectionGeneratorService } from '../services/section-generator.service';
import { CreateWebsiteIdeaDto } from '../dto/create-website-idea.dto';
import { WebsiteIdeaResponseDto } from '../dto/website-idea-response.dto';

// Custom error filter for better error handling
@Controller('api/website-ideas')
export class WebsiteIdeaController {
  private readonly logger = new Logger(WebsiteIdeaController.name);

  constructor(
    private readonly websiteIdeaService: WebsiteIdeaService,
    private readonly sectionGeneratorService: SectionGeneratorService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ 
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      return new BadRequestException(`Validation failed: ${messages}`);
    }
  }))
  async create(@Body() createWebsiteIdeaDto: CreateWebsiteIdeaDto): Promise<WebsiteIdeaResponseDto> {
    try {
      this.logger.log(`Creating website idea for prompt: "${createWebsiteIdeaDto.prompt}"`);
      
      const result = await this.websiteIdeaService.create(createWebsiteIdeaDto);
      
      this.logger.log(`Successfully created website idea`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create website idea: ${error.message}`, error.stack);
      
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to create website idea. Please try again later.');
    }
  }

  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
  ): Promise<WebsiteIdeaResponseDto[]> {
    try {
      this.logger.log('Fetching all website ideas');
      
      const result = await this.websiteIdeaService.findAll();
      
      this.logger.log(`Successfully fetched ${result.length} website ideas`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to fetch website ideas: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch website ideas. Please try again later.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WebsiteIdeaResponseDto> {
    try {
      this.logger.log(`Fetching website idea with ID: ${id}`);
      
      const result = await this.websiteIdeaService.findOne(id);
      
      this.logger.log(`Successfully fetched website idea: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to fetch website idea ${id}: ${error.message}`, error.stack);
      
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to fetch website idea. Please try again later.');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string; deletedId: string }> {
    try {
      this.logger.log(`Deleting website idea with ID: ${id}`);
      
      await this.websiteIdeaService.delete(id);
      
      this.logger.log(`Successfully deleted website idea: ${id}`);
      return { 
        message: 'Website idea deleted successfully',
        deletedId: id 
      };
    } catch (error) {
      this.logger.error(`Failed to delete website idea ${id}: ${error.message}`, error.stack);
      
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to delete website idea. Please try again later.');
    }
  }

  // New endpoint: Get available website types
  @Get('meta/website-types')
  async getWebsiteTypes(): Promise<Record<string, any>> {
    try {
      this.logger.log('Fetching available website types');
      
      const types = this.sectionGeneratorService.getAvailableWebsiteTypes();
      
      this.logger.log(`Successfully fetched ${Object.keys(types).length} website types`);
      return types;
    } catch (error) {
      this.logger.error(`Failed to fetch website types: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch website types. Please try again later.');
    }
  }

  // New endpoint: Get sections for a specific website type
  @Get('meta/website-types/:type/sections')
  async getSectionsForType(@Param('type') websiteType: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching sections for website type: ${websiteType}`);
      
      if (!this.sectionGeneratorService.isValidWebsiteType(websiteType)) {
        throw new BadRequestException(`Invalid website type: ${websiteType}`);
      }
      
      const sections = this.sectionGeneratorService.getSectionsForType(websiteType);
      
      this.logger.log(`Successfully fetched ${sections.length} sections for type: ${websiteType}`);
      return sections;
    } catch (error) {
      this.logger.error(`Failed to fetch sections for type ${websiteType}: ${error.message}`, error.stack);
      
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to fetch sections. Please try again later.');
    }
  }

  // New endpoint: Health check for the API
  @Get('health/check')
  async healthCheck(): Promise<any> {
    try {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'website-idea-generator',
        version: '1.0.0',
        database: 'connected'
      };
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'website-idea-generator',
        version: '1.0.0',
        database: 'disconnected',
        error: 'Database connection failed'
      });
    }
  }
}
