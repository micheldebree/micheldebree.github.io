DEST_CV=./content/resume
CV_NAME=Michel_de_Bree-Resume

# QR is both artifact as source (for PDF and DocX creation)
CV_QR= $(DEST_CV)/QR.png

CV_SRC=\
	$(DEST_CV)/index.md \
	$(DEST_CV)/Photo.jpg \
	$(DEST_CV)/michel_de_bree.vcf \
	$(CV_QR)


CV_ARTIFACTS=\
	$(DEST_CV)/$(CV_NAME).EN.docx \
	$(DEST_CV)/$(CV_NAME).EN.pdf \
	$(CV_QR)

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

## Resume artifacts

$(DEST_CV)/$(CV_NAME).EN.pdf: $(CV_SRC)
	cd $(DEST_CV) && pandoc --embed-resources --standalone --pdf-engine=wkhtmltopdf --metadata title="Resumé" -o $(CV_NAME).EN.pdf index.md
	qpdf --optimize-images --recompress-flate --compression-level=9 --object-streams=generate --replace-input $@

$(DEST_CV)/$(CV_NAME).EN.docx: $(CV_SRC)
	pandoc --resource-path=$(DEST_CV) --embed-resources --standalone -o $@ $< 

$(DEST_CV)/QR.png:
	qrencode -l L -s 3 -o "$@" https://www.micheldebree.nl/resume/michel_de_bree.vcf
	optipng $@


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
clean:
	rm -rf docs
	rm -rf resources
	rm -rf public
	rm -rf $(CV_ARTIFACTS)
