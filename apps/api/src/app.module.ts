import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { authDirectiveTransformer } from './directives/auth';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantModule } from './tenant/tenant.module';
import { Tenant } from './tenant/entities/tenant.entity';
import { User } from './users/entities/user.entity';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      context: () => ({ data: '123' }),
      transformSchema: (originalSchema) => {
        let schema = originalSchema;

        schema = authDirectiveTransformer(schema, 'auth');

        return schema;
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'developer',
      password: 'secret',
      database: 'postgres',
      models: [Tenant, User],
      synchronize: false,
      define: {
        underscored: true,
      },
    }),
    UsersModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
