"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace("/api/v1");
  const { router, controller } = app;
  const { config } = controller.api;

  router.get("/", controller.home.index);

  apiV1Router.get("/config", config.index);
  apiV1Router.get("/config/list", config.list);
  apiV1Router.get("/config/:id", config.getConfigById);
  apiV1Router.post("/config", config.add);
  apiV1Router.post("/config/:id", config.update);
  apiV1Router.delete("/config/:id", config.delete);
};
