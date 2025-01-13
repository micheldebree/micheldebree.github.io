SRC_CV=./src/cv
DEST_CV=./static/resume
CV_NAME=Michel_de_Bree-Resume

CV_RESOURCES=\
	./content/resume.md \
	$(DEST_CV)/Photo.jpg \
	$(DEST_CV)/QR.png \
	$(DEST_CV)/michel_de_bree.vcf \

CV_ARTIFACTS=\
	$(DEST_CV)/Michel_de_Bree-Resume.EN.docx \
	$(DEST_CV)/Michel_de_Bree-Resume.EN.pdf \

.PHONY: test
test: all
	open http://localhost:1313
	hugo -D server --disableFastRender

.PHONY: all
all: \
	icons \
	$(CV_ARTIFACTS)
	# csdbCal 
	hugo --minify

icons: static/images/favicon-16x16.png \
	static/images/favicon-32x32.png \
	static/images/apple-touch-icon.png

## Resume

content/resume.md: $(SRC_CV)/README.md
	cp $< $@


$(DEST_CV)/$(CV_NAME).EN.pdf: $(CV_RESOURCES)
	pandoc --resource-path=$(DEST_CV) --pdf-engine=wkhtmltopdf --metadata title="Resumé" -o $@ $<

$(DEST_CV)/$(CV_NAME).EN.docx: $(CV_RESOURCES)
	pandoc --resource-path=$(DEST_CV) -o $@ $< 

$(DEST_CV)/QR.png:
	qrencode -l L -s 3 -o "$@" https://www.micheldebree.nl/resume/michel_de_bree.vcf
	optipng $@

$(DEST_CV)/%: $(SRC_CV)/%
	mkdir -p static/resume
	cp $< $@


.PHONY: cleancv
cleancv:
	rm -rf $(CV_RESOURCES)
	rm -rf $(CV_ARTIFACTS)

.PHONY: csdbCal
csdbCal:
	cd ./static/csdb && csdbCal

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
clean: cleancv
	rm -rf docs
	rm -rf resources
	rm -rf public
