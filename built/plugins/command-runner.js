"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _path = _interopRequireDefault(require("path"));
var _htmlEntities = require("html-entities");
var _logger = _interopRequireWildcard(require("../utils/logger"));
var _fileService = _interopRequireDefault(require("../services/file-service"));

var _plugin = require("../decorators/plugin");
var _qqService = _interopRequireDefault(require("../services/qq-service"));var _dec, _class, _temp;function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

const COMMAND_404 = "您所调用的指令不存在尝试使用, '!help'来查看所有可用指令";let











CommandRunner = (_dec = (0, _plugin.Plugin)({ name: 'command-runner', weight: 99, type: 'message', shortInfo: '指令响应', info: "响应群聊/私聊指令, 指令'!'或'！'开头", default: true, hide: true, mute: true }), _dec(_class = (_temp = class CommandRunner {constructor() {this.
    command = {
      private: {},
      group: {} };}


  /**
   * 指令分类
   * @param {any} command 指令对象
   */
  classifyCommand(command) {
    if (command.type === 'all' || command.type === 'private') {
      _logger.default.debug(`type is '${command.type}', load into private command list`);
      this.command.private[command.command] = command;
    }
    if (command.type === 'all' || command.type === 'group') {
      _logger.default.debug(`type is '${command.type}', load into group command list`);
      this.command.group[command.command] = command;
    }
  }

  init() {var _this = this;return _asyncToGenerator(function* () {
      (0, _logger.blockLog)(['CommandRunner', 'v1.0'], 'info', '@', 0, 10);
      _logger.default.info('======== start load command  ========');
      // eslint-disable-next-line no-restricted-syntax
      var _iterator = _createForOfIteratorHelper(_fileService.default.getDirFiles(_path.default.resolve(__dirname, 'commands'))),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {const file = _step.value;
          // eslint-disable-next-line import/no-dynamic-require, global-require
          const required = require(file.path);
          if (!required || !required.default) {
            _logger.default.warn('wrong command constructor!!!!!, skip');
            _logger.default.warn(`check file at: ${file.path}`);
            continue;
          }
          const Command = required.default;
          const command = new Command();
          if (!command.name) throw Error('command require a name');
          command.setDBInstance(_this.DBInstance);
          if (command.createTable) {
            _logger.default.debug('create command require database');
            yield command.createTable();
          }
          if (command.init) {
            _logger.default.debug('init command');
            yield command.init();
          }
          _this.classifyCommand(command);
          _logger.default.info(`load command '${command.command}' complete`);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      _logger.default.info('======== all command loaded  ========');})();
  }

  /**
   * 判断是否为指令调用内容, 返回指令和参数
   * @param {string} content 完整内容
   */
  isCommand(content) {
    let match = content.match(/^[!|\uFF01]([a-zA-Z]{2,})\s([\0-\uFFFF]*)$/);
    if (match) {const _match =
      match,_match2 = _slicedToArray(_match, 3),name = _match2[1],params = _match2[2];
      // 需要 html decode，发现标点符号会被转译
      return { name, params: (0, _htmlEntities.decode)(params.trim()) };
    }
    // 对无参数指令做分别处理, 防止出现!recent1 类似这样不加空格也能匹配成功的问题
    match = content.match(/^[!|\uff01]([a-zA-Z]{2,})$/);
    if (!match) return null;
    return {
      name: match[1],
      params: '' };

  }

  groupCommand(body, command, type) {
    const commandInstance = this.command.group[command.name];
    if (!commandInstance) {
      _qqService.default.sendGroupMessage(body.group_id, COMMAND_404);
      return;
    }
    return commandInstance.trigger(command.params, body, type, this.command.group);
  }

  privateCommand(body, command, type) {
    const commandInstance = this.command.private[command.name];
    if (!commandInstance) {
      _qqService.default.sendPrivateMessage(body.user_id, COMMAND_404);
      return;
    }
    return commandInstance.trigger(command.params, body, type, this.command.private);
  }

  go(body, type) {var _this2 = this;return _asyncToGenerator(function* () {const
      message = body.message;
      const c = _this2.isCommand(message);
      if (!c) return; // 不是指令, 直接跳过流程
      switch (type) {
        case 'group':
          yield _this2.groupCommand(body, c, type);
          break;
        case 'private':
          yield _this2.privateCommand(body, c, type);
          break;
        default:}

      return 'break';})();
  }

  // @withTransaction
  // async createTable(trx) {
  //   if (!(await trx.schema.hasTable('group_command_list'))) {
  //     await trx.schema.createTable('group_command_list', (table) => {
  //       table.bigInteger('group_id').primary();
  //       table.string('command_list');
  //     });
  //   }
  // }
}, _temp)) || _class);var _default =

CommandRunner;exports.default = _default;