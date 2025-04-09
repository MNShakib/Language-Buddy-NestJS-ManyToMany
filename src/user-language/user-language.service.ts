import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguage } from './user-language.entity';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UsersService } from '../user/users.service';
import { LanguagesService } from '../languages/languages.service';

@Injectable()
export class UserLanguageService {
  constructor(
    @InjectRepository(UserLanguage)
    private readonly userLanguageRepository: Repository<UserLanguage>,
    private readonly usersService: UsersService,
    private readonly languagesService: LanguagesService,
  ) {}

  async findAll(): Promise<UserLanguage[]> {
    return this.userLanguageRepository.find({ relations: ['user', 'language'] });
  }

  async findOne(id: number): Promise<UserLanguage> {
    const userLanguage = await this.userLanguageRepository.findOne({ where: { id }, relations: ['user', 'language'] });
    if (!userLanguage) {
      throw new NotFoundException(`UserLanguage with id ${id} not found`);
    }
    return userLanguage;
  }

  async create(createUserLanguageDto: CreateUserLanguageDto): Promise<UserLanguage> {
    const user = await this.usersService.findOne(createUserLanguageDto.userId);
    if (!user) {
      throw new NotFoundException(`User with id ${createUserLanguageDto.userId} not found`);
    }
    const language = await this.languagesService.findOne(createUserLanguageDto.languageId);
    if (!language) {
      throw new NotFoundException(`Language with id ${createUserLanguageDto.languageId} not found`);
    }
    const userLanguage = this.userLanguageRepository.create({
      role: createUserLanguageDto.role,
      proficiency: createUserLanguageDto.proficiency,
      experience: createUserLanguageDto.experience,
      user,
      language,
    });
    return this.userLanguageRepository.save(userLanguage);
  }

  async update(id: number, updateUserLanguageDto: Partial<CreateUserLanguageDto>): Promise<UserLanguage> {
    await this.userLanguageRepository.update(id, updateUserLanguageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userLanguageRepository.delete(id);
  }
}
