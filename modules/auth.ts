import { Elysia } from "elysia";
import { prisma } from "../prisma/client";
import jwt from "@elysiajs/jwt";

export const authModule = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: "MY_SECRET_KEY",
    })
  )

  // Register
  .post("/register", async ({ body }) => {
    const { email, password, role } = body as any;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return { error: "User already exists" };

    const user = await prisma.user.create({
      data: { email, password, role },
    });

    return { message: "Registered", user };
  })

  // Login
  .post("/login", async ({ body, jwt }) => {
    const { email, password } = body as any;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password)
      return { error: "Invalid credentials" };

    const token = await jwt.sign({
      id: String(user.id),
      role: user.role,
    } as any);

    return { token, role: user.role };
  });
