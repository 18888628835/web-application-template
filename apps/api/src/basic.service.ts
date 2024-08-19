import { GraphQLError } from 'graphql';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export class BasicService {
  constructor(protected database: Sequelize) {}

  async transaction<T>(
    tenant: string,
    callback: (trx: Transaction) => Promise<T>,
  ) {
    try {
      return this.database.transaction(async (trx) => {
        const options = { transaction: trx };
        await this.database.query(
          `SET app.current_tenant="${tenant}"`,
          options,
        );
        return await callback(trx);
      });
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
