import { Injectable } from '@nestjs/common';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { InjectModel } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';
import { Sequelize } from 'sequelize-typescript';
import { BasicService } from 'src/basic.service';

@Injectable()
export class TenantService extends BasicService {
  constructor(
    protected database: Sequelize,

    @InjectModel(Tenant) private tenantClient: typeof Tenant,
  ) {
    super(database);
  }

  create(createTenantInput: CreateTenantInput) {
    console.log(
      '——————🚀🚀🚀🚀🚀 —— create —— createTenantInput:',
      createTenantInput,
    );
    return 'This action adds a new tenant';
  }

  async findAll() {
    const tenants = await this.tenantClient.findAll();
    for (const tenant of tenants) {
      const tenantWithUser = await this.transaction(tenant.id, async (trx) => {
        return await this.tenantClient.findOne({
          transaction: trx,
          include: [{ all: true }],
        });
      });
      tenant.users = tenantWithUser.users;
    }
    return tenants;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantInput: UpdateTenantInput) {
    console.log(
      '——————🚀🚀🚀🚀🚀 —— update —— updateTenantInput:',
      updateTenantInput,
    );
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
