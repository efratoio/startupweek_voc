SHELL:=/bin/bash

default: debug

all: default lint test

.PHONY: debug
debug: node_modules
	yarn run build:frontend
	yarn run build:server

.PHONY: node_modules
node_modules:
	yarn install

.PHONY: lint
lint: node_modules
	yarn run lint:src
	yarn run lint:style

.PHONY: run-frontend
run-frontend: node_modules
	yarn start:frontend

.PHONY: run-server
run-server: node_modules
	yarn start:server

.PHONY: test
test: node_modules
	yarn test

.PHONY: release
release: node_modules
	yarn run build:frontend:release
	yarn run build:server

.PHONY: package
package: clean release
	rm -Rf node_modules
	yarn install --production
	tar cfz `git describe`.tar.gz dist/ index.html config.js node_modules server/

.PHONY: clean
clean:
	rm -Rf dist/
	rm -Rf node_modules/
	rm -Rf server/
