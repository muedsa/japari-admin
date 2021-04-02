"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _plugin = require("../decorators/plugin");
var _db = require("../decorators/db");
var _scheduleService = _interopRequireDefault(require("../services/schedule-service"));var _dec, _class, _class2;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {var desc = {};Object.keys(descriptor).forEach(function (key) {desc[key] = descriptor[key];});desc.enumerable = !!desc.enumerable;desc.configurable = !!desc.configurable;if ('value' in desc || desc.initializer) {desc.writable = true;}desc = decorators.slice().reverse().reduce(function (desc, decorator) {return decorator(target, property, desc) || desc;}, desc);if (context && desc.initializer !== void 0) {desc.value = desc.initializer ? desc.initializer.call(context) : void 0;desc.initializer = undefined;}if (desc.initializer === void 0) {Object.defineProperty(target, property, desc);desc = null;}return desc;}let







ScheduleDBLoader = (_dec = (0, _plugin.Plugin)({ name: 'schedule-db-loader', weight: 1, type: null, // 类型为空, 不添加到插件队列内
  mute: true }), _dec(_class = (_class2 = class ScheduleDBLoader {init() {
    _scheduleService.default.setDBInstance(this.DBInstance);
  }


  createTable(trx) {return _asyncToGenerator(function* () {
      if (yield trx.schema.hasTable('schedule')) return;
      return trx.schema.createTable('schedule', table => {
        table.integer('group_id').primary();
        table.string('name');
        table.string('rule');
        table.string('text');
      });})();
  }}, (_applyDecoratedDescriptor(_class2.prototype, "createTable", [_db.withTransaction], Object.getOwnPropertyDescriptor(_class2.prototype, "createTable"), _class2.prototype)), _class2)) || _class);var _default =


ScheduleDBLoader;exports.default = _default;