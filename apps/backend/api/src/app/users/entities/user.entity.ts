import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser, UserGender } from '@manga/utils/shared/interfaces';

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, length: 25 })
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.NOT_SPECIFY })
  public gender: UserGender;

  @BeforeInsert()
  public emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @Column({ default: null })
  public imgUrl?: string;

  @Column('boolean', { default: false })
  public isOnline: boolean;

  @Column({ default: '' })
  public refreshToken?: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
