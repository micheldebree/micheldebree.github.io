# brew install typst tinymist

IN=cv.typ
OUT=cv-michel_de_bree.pdf

$(OUT): $(IN) michel_de_bree.toml  
	typst compile $< $@
	pdfcpu optimize $@
	pdfcpu validate -m strict -l $@

.PHONY: test
test: $(IN)
	tinymist preview $< --partial-rendering

.PHONY: watch
watch: $(CV)
	open $<
	typst watch $(IN)

.PHONY: clean
clean:
	rm *.pdf
