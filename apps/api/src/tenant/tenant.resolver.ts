import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TenantService } from './tenant.service';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';

@Resolver('Tenant')
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Mutation('createTenant')
  create(@Args('createTenantInput') createTenantInput: CreateTenantInput) {
    return this.tenantService.create(createTenantInput);
  }

  @Query('tenants')
  findAll() {
    return this.tenantService.findAll();
  }

  @Query('tenant')
  findOne(@Args('id') id: number) {
    return this.tenantService.findOne(id);
  }

  @Mutation('updateTenant')
  update(@Args('updateTenantInput') updateTenantInput: UpdateTenantInput) {
    return this.tenantService.update(updateTenantInput.id, updateTenantInput);
  }

  @Mutation('removeTenant')
  remove(@Args('id') id: number) {
    return this.tenantService.remove(id);
  }
}
