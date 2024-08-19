import { CreateTenantInput } from './create-tenant.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTenantInput extends PartialType(CreateTenantInput) {
  id: number;
}
