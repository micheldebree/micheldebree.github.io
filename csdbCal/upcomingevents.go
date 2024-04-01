package main

import "fmt"

const UpcomingEventsRSS  = "https://csdb.dk/rss/upcomingevents.php"

// XML structure for RSS feed
type RSS struct {
	Channels Channel `xml:"channel"`
}

type Channel struct {
	Items []Item `xml:"item"`
}

type Item struct {
	Guid string `xml:"guid"`
}

// Fetch upcoming event ids from the RSS feed
func getUpcomingEventIds() []string {
	fmt.Println("Fetching events RSS feed...")

	decoder := getXmlBodyDecoder(UpcomingEventsRSS)
	var rss RSS
	err := decoder.Decode(&rss)
	handleError(err)

	var result = make([]string, len(rss.Channels.Items))
	for i, item := range rss.Channels.Items {
		result[i] = getEventId(item)
	}
	return result
}
