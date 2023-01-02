const _client = require("./client.js");
const _canvas = require("./graphics/canvas.js");
const _controls = require("./game/controls.js");
const _options = require("./game/options.js");

_canvas.setup();

_options.setupChecks();

_controls.setupControls();

_client.joinOrCreateRoom();

