SRC = src/wef.core.js src/wef.plugins.js src/wef.log.js
SRC_PARSER = plugins/cssParser/src/cssParser.wef.js plugins/cssParser/lib/cssParser.js

build-wef: $(SRC)
	cat $^ > build/wef.js

build-parser: $(SRC_PARSER)
	cat $^ > build/cssParser.wef.js

build: build-wef build-parser