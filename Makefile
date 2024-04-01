.PHONY: test
test:
	open http://localhost:1313
	hugo -D server --disableFastRender

.PHONY: all
all: \
	icons \
	content/resume.md \
	static/resume/Photo.jpg \
	static/resume/QR.png \
	static/resume/Michel_de_Bree-Resume.EN.docx \
	static/resume/Michel_de_Bree-Resume.EN.pdf \
	static/resume/michel_de_bree.vcf \
	public/csdb/events.ics
	hugo --minify

icons: static/images/favicon-16x16.png \
	static/images/favicon-32x32.png \
	static/images/apple-touch-icon.png

# TODO: subtree?
content/resume.md: ../micheldebree.nl/cv/README.md
	cp $< $@

public/csdb/events.ics: csdbCal/events.ics
	mv $< $@

.PHONY: csdbCal/events.ics
csdbCal/events.ics:
	cd ./csdbCal && make run

static/resume/%: ../micheldebree.nl/cv/%
	mkdir -p static/resume
	cp $< $@

static/images/favicon-16x16.png: static/images/logo.svg
	convert -resize 16x16 -background none $< $@
	optipng -o7 $@

static/images/favicon-32x32.png: static/images/logo.svg
	convert -resize 32x32 -background none $< $@
	optipng -o7 $@

static/images/apple-touch-icon.png: static/images/logo.svg
	convert -resize 180x180 -background none $< $@
	optipng -o7 $@

.PHONY: upgrade-theme
upgrade-theme:
	git fetch hugo-coder main
	git subtree pull --prefix themes/hugo-coder hugo-coder main --squash

.PHONY: clean
clean:
	rm -rf docs
	rm -rf resources
	rm -rf public
