import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const applicationModule = new Elysia({ prefix: "/applications" })
  // Submit application
  .post("/", async ({ body }) => {
    const data = body as any;

    const app = await prisma.application.create({
      data,
    });

    return app;
  })

  // List all applications
  .get("/", async () => {
    return await prisma.application.findMany({
      include: { student: true, position: true },
    });
  })

  // Get student applications
  .get("/student/:id", async ({ params }) => {
    return await prisma.application.findMany({
      where: { studentId: Number(params.id) },
      include: { position: true },
    });
  });
