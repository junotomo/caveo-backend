import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm';
import { RoleType } from '../enums/RoleType';

@Entity("user")
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ type: 'enum', enum: RoleType, enumName: 'role'})
    role!: RoleType;

    @Column({ default: true })
    isOnboarded!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date | null;
}