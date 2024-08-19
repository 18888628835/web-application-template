
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateTenantInput {
    exampleField?: Nullable<number>;
}

export interface UpdateTenantInput {
    id: number;
}

export interface CreateUserInput {
    exampleField?: Nullable<number>;
}

export interface UpdateUserInput {
    id: number;
}

export interface Tenant {
    id: string;
    users: Nullable<User>[];
}

export interface IQuery {
    tenants(): Nullable<Tenant>[] | Promise<Nullable<Tenant>[]>;
    tenant(id: number): Nullable<Tenant> | Promise<Nullable<Tenant>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createTenant(createTenantInput: CreateTenantInput): Tenant | Promise<Tenant>;
    updateTenant(updateTenantInput: UpdateTenantInput): Tenant | Promise<Tenant>;
    removeTenant(id: number): Nullable<Tenant> | Promise<Nullable<Tenant>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    name?: Nullable<string>;
    age?: Nullable<string>;
    tenantId?: Nullable<string>;
    id: string;
    tenant: Tenant;
}

type Nullable<T> = T | null;
