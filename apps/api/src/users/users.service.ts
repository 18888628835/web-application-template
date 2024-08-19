import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from 'gen-types';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { BasicService } from 'src/basic.service';

@Injectable()
export class UsersService extends BasicService {
  constructor(
    protected database: Sequelize,

    @InjectModel(User)
    private UserClient: typeof User,
  ) {
    super(database);
  }
  create(createUserInput: CreateUserInput) {
    console.log(
      '——————🚀🚀🚀🚀🚀 —— create —— createUserInput:',
      createUserInput,
    );
    return 'This action adds a new user';
  }

  async findAll(tenantId: string) {
    return await this.transaction(tenantId, async (trx) => {
      return await this.UserClient.findAll({
        transaction: trx,
        include: [{ all: true }],
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    console.log(
      '——————🚀🚀🚀🚀🚀 —— update —— updateUserInput:',
      updateUserInput,
    );
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
