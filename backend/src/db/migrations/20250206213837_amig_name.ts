import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return await knex.schema.createTable('users', (table) => {
        //Users
        table.uuid('id').primary().notNullable();
        table.string('full_name');
        table.string('email').notNullable().unique().index();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.boolean('is_email_verified').notNullable().defaultTo(false);
        table.boolean('is_deleted').notNullable().defaultTo(false);
  
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists('users')
}

