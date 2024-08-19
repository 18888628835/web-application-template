import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantResolver } from './tenant.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tenant])],
  providers: [TenantResolver, TenantService],
})
export class TenantModule {}
