import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto, Users, PaginationDto} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];


  onModuleInit() {

    for(let i = 0; i< 100; i++){
      this.create({username: randomUUID(), password: randomUUID(), age: 0});
    }
    
  }


  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID()
    }

    this.users.push(user);
    return user;

  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User{
    return this.users.find(u => u.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {

    const userIndex = this.users.findIndex(u => u.id === id);
    if(userIndex !== -1){
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto
      }

      return this.users[userIndex]
    }

    throw new NotFoundException(`User not found by id ${id}`)
    
  }

  remove(id: string) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if(userIndex !== -1){
      return this.users.splice(userIndex)[0];
    }

    throw new NotFoundException(`User not found by id ${id}`)
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>):
    Observable<Users> {

      const subject = new Subject<Users>();

      const onNext = (pagination: PaginationDto) => {
        const start = pagination.page * pagination.skip;
        subject.next({
          users: this.users.slice(start, start + pagination.skip)
        })
      }

      const onComplete = () => subject.complete();

      paginationDtoStream.subscribe({
        next: onNext,
        complete: onComplete
      });

      return subject.asObservable();
  }
}
