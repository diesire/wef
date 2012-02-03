SRC = src/wef.core.js src/wef.crossBrowser.js src/wef.logger.js src/wef.net.js src/wef.cssParser.js

build: $(SRC)
	cat $^ > build/wef.js

all: build