SRC = src/wef.core.js src/wef.crossBrowser.js src/wef.logger.js src/wef.net.js src/wef.cssParser.js

build: $(SRC)
	cat $^ > build/wef.js

docs:
	java -jar lib/jsdoc-toolkit/jsrun.jar lib/jsdoc-toolkit/app/run.js -a -t=lib/jsdoc-toolkit/templates/jsdoc -d=doc/ src/


all: build docs
