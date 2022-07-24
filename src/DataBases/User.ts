import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_:number;
    @Column()
    name_user:string;
    @Column()
    apellido:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column({
        default: false
    })
    active: boolean;
    @CreateDateColumn()
    create_At: Date;
    @UpdateDateColumn()
    update_At: Date;
}