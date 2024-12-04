import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
const app: Application = express();

//* Parsers
app.use(express.json());
app.use(cors());

//* Application routes
app.use("/api/v1", router);

//* Default route
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Hello from MONGOOSE server!",
  });
});

//* Route not found
app.use(notFound);

//* Global error handler
app.use(globalErrorHandler);

export default app;
