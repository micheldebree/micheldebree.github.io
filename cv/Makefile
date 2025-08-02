.PHONY: test
test: 
	tinymist preview cv.typ --partial-rendering

.PHONY: watch
watch: cv.pdf 
	open $<
	typst watch cv.typ

cv.pdf: cv.typ michel_de_bree.toml  
	typst compile $<
