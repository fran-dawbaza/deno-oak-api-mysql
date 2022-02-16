import { Context as OakContext } from "https://deno.land/x/oak/mod.ts";
import { AuthUser } from "./../auth/auth-user.ts";

/**
 * Custom appilication context
 */
export class Context extends OakContext {
  user?: AuthUser;
}
