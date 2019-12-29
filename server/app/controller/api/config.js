"use strict";

const Controller = require("egg").Controller;

class ConfigController extends Controller {
  async index() {
    this.ctx.body = "活动配置信息";
  }

  async list() {
    const result = await this.ctx.model.Config.findAll({
      where: {
        disabled: 0
      }
    });
    this.ctx.body = {
      success: true,
      data: result
    };
  }

  async getConfigById() {
    const { id } = this.ctx.params;
    const result = await this.ctx.model.Config.findAll({
      where: {
        id: id,
        disabled: 0
      }
    });
    this.ctx.body = {
      success: true,
      data: result
    };
  }

  async add() {
    let result = await this.ctx.model.Config.create(this.ctx.request.body);
    this.ctx.body = { success: true, data: result.id };
  }

  async update() {
    const { ...otherParam } = this.ctx.request.body;
    await this.ctx.model.Config.update(otherParam, {
      where: { id: this.ctx.params.id }
    });
    this.ctx.body = {
      success: true,
      data: true
    };
  }

  async delete() {
    const { id } = this.ctx.params;
    let result = await this.ctx.model.Config.update(
      { disabled: true },
      { where: { id: id } }
    );
    this.ctx.body = {
      success: true,
      data: result
    };
  }
}

module.exports = ConfigController;
