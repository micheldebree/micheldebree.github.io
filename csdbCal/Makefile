SRC := $(wildcard *.go)

.PHONY: run
run:
	go run $(SRC)

.PHONY: all
all: $(SRC)
	go build -ldflags "-w -s"

.PHONY: clean
clean:
	rm -f *.ics

