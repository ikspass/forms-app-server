import { HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
const jwt = require('jsonwebtoken')


@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async check(user: User) {
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto){
        const saltRounds = 5;
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate){
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, saltRounds);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUserByEmail(userDto.email);
        if(user){
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (user && passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({message: 'Неверный пароль'})
        }
        throw new UnauthorizedException({message: 'Пользователь с таким email не существует'})
    }
}
