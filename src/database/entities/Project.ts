import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity() 
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number; // ex: 1

    @Column('text')
    project_name!: string; // ex: Epic Project

    @Column('json')
    project_meta!: Object; // JSON with members, roles, etc
    
    @Column('blob')
    project_image!: Blob; // image of the project

}