cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-websocket-server/www/wsserver.js",
        "id": "cordova-plugin-websocket-server.WebSocketServer",
        "pluginId": "cordova-plugin-websocket-server",
        "clobbers": [
            "cordova.plugins.wsserver"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-websocket-server": "1.1.2"
}
// BOTTOM OF METADATA
});