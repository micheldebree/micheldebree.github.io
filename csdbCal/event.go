package main

import (
	"fmt"
	"net/url"
)

const EventEndpoint = "https://csdb.dk/webservice/?type=event&id="

// XML structure for Event
type CSDbData struct {
	Event EventElement
}

type EventElement struct {
	ID         string
	Name       string
	EventType  string
	AKA        string
	StartDay   int
	StartMonth int
	StartYear  int
	EndDay     int
	EndMonth   int
	EndYear    int
	Address    string
	Zip        string
	City       string
	Country    string
	Website    string
}

// get the event id from the RSS feed item
func getEventId(item Item) string {
	u, err := url.Parse(item.Guid)
	handleError(err)

	query, err := url.ParseQuery(u.RawQuery)
	handleError(err)

	return query["id"][0]
}

// Get one event from the webservice
func getEvent(id string) EventElement {
	fmt.Printf("Fetching event %s ...\n", id)

	url := fmt.Sprint(EventEndpoint, id)
	decoder := getXmlBodyDecoder(url)

	var csdbData CSDbData
	err := decoder.Decode(&csdbData)
	handleError(err)

	return csdbData.Event
}

// Get events for a list of ids
func getEventElements(ids []string) []EventElement {
	result := make([]EventElement, len(ids))
	for i, id := range ids {
		result[i] = getEvent(id)
	}
	return result
}
