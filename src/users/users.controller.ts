import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BlockUserDto } from './dto/block-user.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary:'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('userList')
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary:'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary:'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/block')
    block(@Body() dto: BlockUserDto){
        return this.usersService.block(dto);
    }
}
