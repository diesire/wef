SRC = src/wef.core.js src/wef.logger.js src/wef.cssParser.js

build: $(SRC)
	cat $^ > build/wef.js

all: build