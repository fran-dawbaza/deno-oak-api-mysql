import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

/** Runs on migrate */
export const up: Migration = () => {
  return `
    ALTER TABLE users
    ADD UNIQUE email_unique (email)
  `;
};

/** Runs on rollback */
export const down: Migration = () => {
  return `
    ALTER TABLE users
    DROP INDEX email_unique
  `;
};
