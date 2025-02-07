import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    readonly email: string;

    @ApiProperty({example: '123456789', description: 'Пароль'})
    readonly password: string;

    @ApiProperty({example: 'user', description: 'Имя'})
    readonly name: string;
}