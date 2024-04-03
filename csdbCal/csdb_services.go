package main

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"golang.org/x/net/html/charset"
)

type EntryType string

const (
	EventType   EntryType = "event"
	ReleaseType           = "release"
)

const UpcomingEventsRSS = "https://csdb.dk/rss/upcomingevents.php"
const LatestReleasesRSS = "https://csdb.dk/rss/latestreleases.php"

const ItemUrl = "https://csdb.dk/webservice/?type=%s&id=%s"

// XML structure for a CSDb RSS feed
type RSS struct {
	Channels Channel `xml:"channel"`
}

type Channel struct {
	Items []Item `xml:"item"`
}

type Item struct {
	Guid string `xml:"guid"`
}

// Fetch item ids from a CSDb RSS feed
func getItemIds(url string) []string {
	fmt.Printf("Fetching RSS feed %s...\n", url)

	decoder := getXmlBodyDecoder(url)
	var rss RSS
	err := decoder.Decode(&rss)
	abortOnError(err)

	var result = make([]string, len(rss.Channels.Items))
	for i, item := range rss.Channels.Items {
		result[i] = getIdFromUrl(item.Guid)
	}
	return result
}

// Fetch a CSDb item of a certain type by id and return an XML decoder
// for decoding the body
func getItemXMLDecoder(entryType EntryType, id string) *xml.Decoder {
	url := fmt.Sprintf(ItemUrl, entryType, id)
	fmt.Printf("Fetching %s ...\n", url)
	return getXmlBodyDecoder(url)
}

// An XML decoder for the body of a GET <url>
func getXmlBodyDecoder(url string) *xml.Decoder {
	body := getBody(url)
	reader := bytes.NewReader(body)
	// XML decoder that can handle non-UTF-8 encoding
	decoder := xml.NewDecoder(reader)
	decoder.CharsetReader = charset.NewReaderLabel
	return decoder
}

// GET <url> and return body of the response
func getBody(url string) []byte {
	resp, err := http.Get(url)
	abortOnError(err)
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	abortOnError(err)
	return body
}

// get the 'id' query parameter from a URL
func getIdFromUrl(anUrl string) string {
	u, err := url.Parse(anUrl)
	abortOnError(err)

	query, err := url.ParseQuery(u.RawQuery)
	abortOnError(err)

	return query["id"][0]
}
