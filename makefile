# Keep this up to date with https://pages.github.com/versions
JEKYLL_VERSION=3.7.3
JEKYLL_IMAGE=micheldebree/jekyll-github
JEKYLL=docker run --rm -it --volume="$$PWD:/srv/jekyll" -p 4000:4000 $(JEKYLL_IMAGE) jekyll
DEBUG=docker run --rm --volume="$$PWD:/srv/jekyll" -it $(JEKYLL_IMAGE) /bin/bash

build: image
	$(JEKYLL) build

serve: image
	$(JEKYLL) serve --incremental --watch --force_polling

debug: image
	$(DEBUG)

image:
	docker build -t $(JEKYLL_IMAGE) .
