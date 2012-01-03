SRC = src/wef.core.js src/wef.logger.js src/wef.cssParser.js

build-wef: $(SRC)
	cat $^ > build/wef.js

build: build-wef

all: build