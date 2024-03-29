import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { 
    CreateUserDto,
    Empty,
    FindOneUserDto, 
    PaginationDto, 
    UpdateUserDto, 
    Users, 
    UsersServiceController, 
    UsersServiceControllerMethods, 
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  
  constructor(private readonly usersService: UsersService) {
    console.log("usersService in auth: ", this.usersService)
  }


  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  findAllUsers() {
    return this.usersService.findAll();
  }


  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }


  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
