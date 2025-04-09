import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserLanguage } from '../user-language/user-language.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserLanguage, userLanguage => userLanguage.language)
  userLanguages: UserLanguage[];
}
