import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "uf" })
export class Uf {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, length: 2 })
    sigla: string;

    @Column({ nullable: false, unique: true, length: 50 })
    nome: string;
}
