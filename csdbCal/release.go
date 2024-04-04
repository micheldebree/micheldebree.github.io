package main

// XML structure for Release
type CSDbDataReleases struct {
	Release ReleaseElement
}

type ReleaseElement struct {
	ID            string
	Name          string
	Type          string
	ReleaseDay    int
	ReleaseMonth  int
	ReleaseYear   int
	ReleasedAt    string `xml:"ReleasedAt>Event>Name"`
	ScreenShot    string
	ReleasedBy    string          `xml:"ReleasedBy>Group>Name"`
	Credits       []ReleaseCredit `xml:"Credits>Credit"`
	DownloadLinks []DownloadLink  `xml:"DownloadLinks>DownloadLink"`
}

type ReleaseGroup struct {
	Name string
}

type ReleaseCredit struct {
	Handle     string `xml:"Handle>Handle"`
	CreditType string
}

type DownloadLink struct {
	Link      string
	Downloads int
}

func getRelease(id string) ReleaseElement {

	decoder := getItemXMLDecoder(ReleaseType, id)

	var csdbData CSDbDataReleases
	err := decoder.Decode(&csdbData)
	abortOnError(err)

	// TODO: handle is not always set in credits,
	// in that case, fetch the handle by ID

	return csdbData.Release
}

// Get releases for a list of ids
func getReleases(ids []string) []ReleaseElement {
	result := make([]ReleaseElement, len(ids))
	for i, id := range ids {
		result[i] = getRelease(id)
	}
	return result
}
