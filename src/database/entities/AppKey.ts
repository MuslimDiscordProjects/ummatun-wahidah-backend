import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity() 
export class AppKey extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    key!: number;

    @Column("text")
    owner!: string;
}