import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserLanguage } from '../user-language/user-language.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserLanguage, userLanguage => userLanguage.user)
  userLanguages: UserLanguage[];
}
