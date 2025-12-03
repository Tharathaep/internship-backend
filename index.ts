import { Elysia } from "elysia";
import { authModule } from "./modules/auth";
import { studentModule } from "./modules/students";
import { companyModule } from "./modules/companies";
import { positionModule } from "./modules/positions";
import { applicationModule } from "./modules/applications";
import { reportModule } from "./modules/reports";

const app = new Elysia()
  .use(authModule)
  .use(studentModule)
  .use(companyModule)
  .use(positionModule)
  .use(applicationModule)
  .use(reportModule);

export default app;