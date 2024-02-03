import controller from "../controllers/index.controller.js";

export function index(app) {
  app.get("/", controller);
}
