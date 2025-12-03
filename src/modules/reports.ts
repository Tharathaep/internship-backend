import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const reportModule = new Elysia({ prefix: "/reports" })
  // List all reports
  .get("/", async () => {
    return await prisma.report.findMany({
      include: { student: true },
    });
  })

  // Create weekly report
  .post("/", async ({ body }) => {
    const data = body as any;

    const report = await prisma.report.create({
      data,
    });

    return report;
  })

  // Get report by student
  .get("/student/:id", async ({ params }) => {
    return await prisma.report.findMany({
      where: { studentId: Number(params.id) },
    });
  });
