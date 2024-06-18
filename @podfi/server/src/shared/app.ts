import { Hono } from "hono";
import { ServicesRouter } from "../services";

export const app = new Hono()
  .route('/api', ServicesRouter)

export type App = typeof app
