import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const positionModule = new Elysia({ prefix: "/positions" })
  // List all positions
  .get("/", async () => {
    return await prisma.position.findMany({
      include: { company: true },
    });
  })

  // Create position
  .post("/", async ({ body }) => {
    const data = body as any;

    const pos = await prisma.position.create({
      data,
    });

    return pos;
  })

  // Get detail
  .get("/:id", async ({ params }) => {
    return await prisma.position.findUnique({
      where: { id: Number(params.id) },
      include: { company: true },
    });
  });
