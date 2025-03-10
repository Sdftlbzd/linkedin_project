import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Experience } from "./Experience.model";
import { Education } from "./Education.model";
import { Post } from "./Post.model";
import { Connection } from "./Connection.model";
import { Vacancy } from "./Vacancy.model";
import { CommonEntity } from "./Common.model";
import { EGenderType, ERoleType } from "../../Core/app/enums";

@Entity({ name: "users" })
export class User extends CommonEntity {
  @Column({ type: "varchar", length: 150 })
  name: string;

  @Column({ type: "varchar", length: 150 })
  surname: string;

  @Column({
    type: "enum",
    enum: EGenderType,
    default: EGenderType.OTHER,
  })
  gender: EGenderType;

  @Column({ type: "varchar", length: 150 })
  email: string;

  @Column({ type: "varchar", length: 60 })
  password: string;

  @Column({ type: "int", nullable: true })
  verifyCode: number;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "datetime", default: null })
  verifyExpiredIn: Date;

  @Column({
    type: "enum",
    enum: ERoleType,
    default: ERoleType.USER,
  })
  role: ERoleType;

  @Column({ nullable: true })
  avatar_path: string;

  @Column({ type: "text" })
  about: string;

  @Column({ type: "varchar", length: 150, default: null })
  companyName: string;

  @Column({ type: "datetime" })
  birthdate: Date;

  @Column({ type: "varchar", length: 13, default: null })
  phone: string;

  @Column({ type: "boolean", default: false })
  isVisibility: boolean;

  @Column({ type: "varchar", default: null })
  passToken: String;

  @Column({ type: "datetime", default: null })
  resetExpiredIn: Date;

  @OneToMany(() => Experience, (experience) => experience.user, { onDelete: "CASCADE" })
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.user, { onDelete: "CASCADE" })
  educations: Education[];

  @OneToMany(() => Post, (post) => post.user, { onDelete: "CASCADE" })
  posts: Post[];

  @ManyToMany(() => Post, (post) => post.likedUsers, { onDelete: "CASCADE" })
  @JoinTable({
    name: "users_liked_posts",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "post_id" },
  })
  likedPosts: Post[];

  @OneToMany(() => Connection, (connection) => connection.user)
  connections: User[];

  @ManyToMany(() => Vacancy, (vacancy) => vacancy.appliedUsers)
  @JoinTable()
  appliedVacancies: Vacancy[];
}
