import { Elysia } from "elysia";
import { prisma } from "../prisma/client";
import jwtPlugin from "@elysiajs/jwt";

type Role = "STUDENT" | "TEACHER" | "COMPANY";

interface RegisterBody {
  email: string;
  password: string;
  role: Role;
}

interface LoginBody {
  email: string;
  password: string;
}

export const authModule = new Elysia({ prefix: "/auth" })
  .use(
    jwtPlugin({
      name: "jwt",
      secret: process.env.JWT_SECRET || "MY_SECRET_KEY",
    })
  )

  // Register
  .post("/register", async (ctx) => {
    const { email, password, role } = ctx.body as RegisterBody;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return { error: "User already exists" };

    const user = await prisma.user.create({ data: { email, password, role } });
    return { message: "Registered", user };
  })

  // Login
  .post("/login", async (ctx) => {
    const { email, password } = ctx.body as LoginBody;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password)
      return { error: "Invalid credentials" };

    // ใช้ ctx['jwt'] แทนตรง ๆ เพื่อให้ TS ไม่แดง
    const token = await (ctx as any).jwt.sign({
      id: String(user.id),
      role: user.role as Role,
    });

    return { token, role: user.role };
  });
