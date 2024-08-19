import { Injectable } from '@nestjs/common';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { InjectModel } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant) private tenantClient: typeof Tenant) {}

  create(createTenantInput: CreateTenantInput) {
    console.log(
      '——————🚀🚀🚀🚀🚀 —— create —— createTenantInput:',
      createTenantInput,
    );
    return 'This action adds a new tenant';
  }

  async findAll() {
    return await this.tenantClient.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantInput: UpdateTenantInput) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
