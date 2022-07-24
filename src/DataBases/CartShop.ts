import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartShop extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column({
        type: 'numeric'
    })
    price:number;
    @Column()
    description:string;
    @Column()
    category:string;
    @Column()
    image:string;
    @Column({
        type: 'numeric'
    })
    count:number;
}