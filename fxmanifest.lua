fx_version "cerulean"

game "gta5"
author "Pickle"
description "scoreboard for LADOJRP"

ui_page "src/web/dist/index.html"

files {
	"src/web/dist/index.html",
	"src/web/dist/**/*"
}

server_script "dist/server/420.server.js"
server_script "dist/server/server.js"

client_script "dist/client/client.js"

dependencies {}

--webpack_config "server.config.js"
