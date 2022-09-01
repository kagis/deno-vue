.PHONY: all
all:
	docker build -t deno-vue . && docker run -it --rm deno-vue > dist/mod.js
