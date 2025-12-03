import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const companyModule = new Elysia({ prefix: "/companies" })
  // Company list
  .get("/", async () => {
    return await prisma.company.findMany();
  })

  // Create company
  .post("/", async ({ body }) => {
    const data = body as any;

    const company = await prisma.company.create({
      data,
    });

    return company;
  })

  // Get by ID
  .get("/:id", async ({ params }) => {
    return await prisma.company.findUnique({
      where: { id: Number(params.id) },
    });
  });
