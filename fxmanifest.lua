fx_version "cerulean"

game "gta5"
author "Pickle"
description "scoreboard for LADOJRP"

ui_page "web/build/index.html"

files {
	"web/build/index.html",
	"web/build/**/*"
}

server_script "dist/server/420.server.js"
server_script "dist/server/server.js"

client_script "dist/client/client.js"

dependencies {}

--webpack_config "server.config.js"
