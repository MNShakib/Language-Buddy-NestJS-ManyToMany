import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './language.entity';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Language> {
    return this.languagesService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.create(createLanguageDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLanguageDto: Partial<CreateLanguageDto>): Promise<Language> {
    return this.languagesService.update(Number(id), updateLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.languagesService.remove(Number(id));
  }
}
