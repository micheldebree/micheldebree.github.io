package main

import (
	"bytes"
	"encoding/xml"
	"io"
	"net/http"

	"golang.org/x/net/html/charset"
)

// XML decoder that can handle non-UTF-8 encoding
func getDecoder(body []byte) *xml.Decoder {
	// Non UTF-8 input requires this
	reader := bytes.NewReader(body)
	decoder := xml.NewDecoder(reader)
	decoder.CharsetReader = charset.NewReaderLabel
	return decoder
}

// GET <url> and return body of the response
func getBody(url string) []byte {
	resp, err := http.Get(url)
	handleError(err)
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	handleError(err)
	return body
}

// An XML decoder for the body of a GET <url>
func getXmlBodyDecoder(url string) *xml.Decoder {
	return getDecoder(getBody(url))
}

func handleError(err error) {
	if err != nil {
		panic(error.Error(err))
	}
}
