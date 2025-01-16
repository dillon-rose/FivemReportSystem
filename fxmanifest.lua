fx_version 'cerulean'
name 'FiveM Report System'
author 'Pickle'
game 'gta5'

ui_page "web/build/index.html"

files {
	"web/build/index.html",
	"web/build/**/*"
}

server_script 'dist/server/**/*.js'
client_script 'dist/client/**/*.js'

dependencies {
	"screenshot-basic",
}
