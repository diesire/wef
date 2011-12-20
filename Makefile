SRC = src/wef.core.js src/wef.plugins.js
SRC_PARSER = plugins/cssParser/src/cssParser.wef.js plugins/cssParser/lib/cssParser.js
SRC_TEMPLATE = plugins/templateLayout/src/templateLayout.wef.js

#lint:
#	./node_modules/.bin/jslint --onevar false *.js

build-wef: $(SRC)
	cat $^ > build/wef.js

build-parser: $(SRC_PARSER)
	cat $^ > build/cssParser.wef.js

build-template: $(SRC_TEMPLATE)
	cat $^ > build/templateLayout.wef.js

build: build-wef build-parser build-template

#min: build
#	./node_modules/.bin/minifyjs build/wef.js > build/wef.min.js