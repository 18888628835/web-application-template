import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tenant } from 'src/tenant/entities/tenant.entity';

@Table({ tableName: 'rls_users' })
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  age: string;

  @Column(DataType.UUID)
  tenantId: string;

  @BelongsTo(() => Tenant, 'tenantId')
  tenant: Tenant;

  @Column(DataType.TIME)
  createdAt?: Date;

  @Column(DataType.TIME)
  updatedAt?: Date;
}
