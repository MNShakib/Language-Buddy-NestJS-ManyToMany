import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<Language[]> {
    return this.languageRepository.find({ relations: ['userLanguages'] });
  }

  async findOne(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne({ where: { id }, relations: ['userLanguages'] });
      if (!language) {
        throw new NotFoundException(`Language with id ${id} not found`);
      }
      return language;
  }

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(language);
  }

  async update(id: number, updateLanguageDto: Partial<CreateLanguageDto>): Promise<Language> {
    await this.languageRepository.update(id, updateLanguageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
