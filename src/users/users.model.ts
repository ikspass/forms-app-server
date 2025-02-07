import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'user', description: 'Имя'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '123456789', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'admin', description: 'Роль'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'user'})
    role: string;

    @ApiProperty({example: 'false', description: 'Заблокирован ли'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: 'false'})
    isBlocked: boolean;
}