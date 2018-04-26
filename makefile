JEKYLL_VERSION=3.7.3
JEKYLL=docker run --rm --volume="$$PWD:/srv/jekyll" -p 4000:4000 jekyll/minimal:$(JEKYLL_VERSION) jekyll
DEBUG=docker run --rm --volume="$$PWD:/srv/jekyll" -it jekyll/minimal:$(JEKYLL_VERSION) /bin/bash

build:
	$(JEKYLL) build

serve:
	$(JEKYLL) serve --incremental --watch --force_polling

debug:
	$(DEBUG)
