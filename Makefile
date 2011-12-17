SRC = src/wef.core.js src/wef.plugins.js

#lint:
#	./node_modules/.bin/jslint --onevar false *.js

build: $(SRC)
	cat $^ > build/wef.js

#min: build
#	./node_modules/.bin/minifyjs build/wef.js > build/wef.min.js