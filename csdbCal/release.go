package main

// XML structure for Release
type CSDbDataReleases struct {
	Release EventElement
}

type Release struct {
	ID            string
	Name          string
	Type          string
	ReleaseDay    int
	ReleaseMonth  int
	ReleaseYear   int
	ReleasedAt    ReleaseEvent
	ScreenShot    string
	ReleasedBy    ReleaseGroup
	Credits       []ReleaseCredit
	DownloadLinks []DownloadLink
}

type ReleaseEvent struct {
	Name    string
	Website string
}

type ReleaseGroup struct {
	Name string
}

type ReleaseCredit struct {
	Handle     ReleaseHandle
	CreditType string
}

type ReleaseHandle struct {
	Handle string
}

type DownloadLink struct {
	Link      string
	Downloads int
}
