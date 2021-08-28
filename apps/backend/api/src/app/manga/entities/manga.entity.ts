import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IManga } from '@manga/utils/shared/interfaces';



@Entity('manga')
export class Manga implements IManga{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:null})
  imgUrl: string | null;

  @Column()
  title!: string;

  @Column()
  englishTitle!: string;

  @Column()
  originalTitle!: string;

  @Column()
  author!: string;

  @Column("text")
  description!: string;

  @Column()
  year!: number;

  @Column({default:0})
  viewsCount:number

  @Column({default:0})
  chapterCount: number;

  @Column({default:0})
  ratingCount: number;


  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

}


