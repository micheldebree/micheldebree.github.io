# brew install typst tinymist

IN=cv.typ
OUT=CV-Michel_de_Bree.pdf

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
	rm $(OUT)
