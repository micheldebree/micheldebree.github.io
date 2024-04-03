package main

import (
	"os"
)

func main() {
	eventIds := getItemIds(UpcomingEventsRSS)
	eventElements := getEvents(eventIds)

	calendar := createCalender(eventElements)

	err := os.WriteFile("./events.ics", []byte(calendar), 0644)
	abortOnError(err)
}
