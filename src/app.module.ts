import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { LanguagesModule } from './languages/languages.module';
import { UserLanguageModule } from './user-language/user-language.module';
import { User } from './user/user.entity';
import { Language } from './languages/language.entity';
import { UserLanguage } from './user-language/user-language.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@word1',
      database: 'language_buddy',
      entities: [User, Language, UserLanguage],
      synchronize: true, 
    }),
    UsersModule,
    LanguagesModule,
    UserLanguageModule,
  ],
})
export class AppModule {}
