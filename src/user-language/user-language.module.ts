import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguageService } from './user-language.service';
import { UserLanguageController } from './user-language.controller';
import { UserLanguage } from './user-language.entity';
import { UsersModule } from '../user/users.module';
import { LanguagesModule } from '../languages/languages.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguage]), UsersModule, LanguagesModule],
  providers: [UserLanguageService],
  controllers: [UserLanguageController],
})
export class UserLanguageModule {}
