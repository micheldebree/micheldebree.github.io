JEKYLL_VERSION=3.5
JEKYLL=docker run --rm --volume="$$PWD:/srv/jekyll" -it jekyll/minimal:$(JEKYLL_VERSION) jekyll
DEBUG=docker run --rm --volume="$$PWD:/srv/jekyll" -it jekyll/minimal:$(JEKYLL_VERSION) /bin/bash

build:
	$(JEKYLL) build

serve:
	$(JEKYLL) serve --incremental --watch --force_polling

debug:
	$(DEBUG)
