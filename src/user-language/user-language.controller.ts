import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UserLanguage } from './user-language.entity';

@Controller('user-languages')
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Get()
  async findAll(): Promise<UserLanguage[]> {
    return this.userLanguageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserLanguage> {
    return this.userLanguageService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createUserLanguageDto: CreateUserLanguageDto): Promise<UserLanguage> {
    return this.userLanguageService.create(createUserLanguageDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserLanguageDto: Partial<CreateUserLanguageDto>,
  ): Promise<UserLanguage> {
    return this.userLanguageService.update(Number(id), updateUserLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userLanguageService.remove(Number(id));
  }
}
