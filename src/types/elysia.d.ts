import "@elysiajs/jwt";

declare module "elysia" {
  interface Context {
    jwt: import("@elysiajs/jwt").JWT;
  }
}