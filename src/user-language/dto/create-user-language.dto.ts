import { IsNotEmpty, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { LanguageRole } from '../user-language.entity';

export class CreateUserLanguageDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  languageId: number;

  @IsNotEmpty()
  @IsEnum(LanguageRole)
  role: LanguageRole;

  @IsOptional()
  @IsInt()
  proficiency?: number;

  @IsOptional()
  @IsString()
  experience?: string;
}
