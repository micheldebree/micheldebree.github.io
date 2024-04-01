package main

import (
	"fmt"
	"time"

	"github.com/arran4/golang-ical"
)

func createCalender(events []EventElement) string {
	cal := ics.NewCalendar()

	for _, event := range events {
		calEvent := cal.AddEvent(fmt.Sprint("event", event.ID))
		calEvent.SetSummary(event.Name)
		calEvent.SetDescription(event.EventType)
		calEvent.SetURL(event.Website)
		calEvent.SetLocation(fmt.Sprintf("%s, %s, %s", event.Address, event.City, event.Country))

		startDate := time.Date(event.StartYear, time.Month(event.StartMonth), event.StartDay, 0, 0, 0, 0, time.UTC)
		endDate := time.Date(event.EndYear, time.Month(event.EndMonth), event.EndDay, 0, 0, 0, 0, time.UTC)

		calEvent.SetAllDayStartAt(startDate)
		calEvent.SetAllDayEndAt(endDate)
	}

	return cal.Serialize()
}
