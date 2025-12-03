import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const studentModule = new Elysia({ prefix: "/students" })
  // ดึงข้อมูลนักศึกษาทั้งหมด
  .get("/", async () => {
    return await prisma.student.findMany();
  })

  // เพิ่มข้อมูลนักศึกษา
  .post("/", async ({ body }) => {
    const data = body as any;

    const student = await prisma.student.create({
      data,
    });

    return student;
  })

  // ดึงข้อมูลนักศึกษาตามไอดี
  .get("/:id", async ({ params }) => {
    return await prisma.student.findUnique({
      where: { id: Number(params.id) },
    });
  });
