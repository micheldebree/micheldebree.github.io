package main

import (
	"os"
)

func main() {
	eventIds := getUpcomingEventIds()
	eventElements := getEventElements(eventIds)

	calendar := createCalender(eventElements)

	err := os.WriteFile("./events.ics", []byte(calendar), 0644)
	handleError(err)
}
