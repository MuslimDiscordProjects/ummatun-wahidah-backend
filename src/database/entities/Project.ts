import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity() 
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number; // ex: 1

    @Column('text')
    project_name!: string; // ex: Epic Project

    @Column('text')
    project_meta!: string; // JSON with members, roles, etc
    
    @Column('text')
    project_image!: string; // image of the project

}