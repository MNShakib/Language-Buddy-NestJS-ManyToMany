import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Language } from '../languages/language.entity';

export enum LanguageRole {
  TEACHER = 'teacher',
  LEARNER = 'learner',
  BOTH = 'both',
}

@Entity() 
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: LanguageRole,
    default: LanguageRole.BOTH,
  })
  role: LanguageRole;

  @Column({ type: 'int', default: 1 })
  proficiency: number;

  @Column({ nullable: true })
  experience?: string;

  @ManyToOne(() => User, user => user.userLanguages, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Language, language => language.userLanguages, { onDelete: 'CASCADE' })
  language: Language;
}
