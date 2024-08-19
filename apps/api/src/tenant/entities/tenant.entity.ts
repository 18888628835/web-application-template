import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'tenants' })
export class Tenant extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @HasMany(() => User, 'tenantId')
  users: User[];

  @Column(DataType.TIME)
  createdAt?: Date;

  @Column(DataType.TIME)
  updatedAt?: Date;
}
