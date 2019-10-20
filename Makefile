# Keep this up to date with https://pages.github.com/versions
JEKYLL_IMAGE=micheldebree/jekyll-github
JEKYLL=docker run --rm -it --volume="$$PWD:/srv/jekyll" -p 4000:4000 $(JEKYLL_IMAGE) jekyll
DEBUG=docker run --rm --volume="$$PWD:/srv/jekyll" -it $(JEKYLL_IMAGE) /bin/sh

serve: image clean
	$(JEKYLL) serve --incremental --watch --force_polling

build: image
	$(JEKYLL) build

debug: image
	$(DEBUG)

report: 
	lighthouse --view http://localhost:4000

clean:
	rm -rf _site

image:
	docker build -t $(JEKYLL_IMAGE) .
