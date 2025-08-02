#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": experience-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.experience
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons

= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Experience] else [Ervaring]

#v(5pt)

#let data = toml("../michel_de_bree.toml")

#for experience in data.Experience [

  #let daterange = experience.Start
  #if "End" in experience {
    daterange = daterange + sym.space + sym.dash.em + sym.space + experience.End
  }

  #experience-entry(
    title: experience.Title.at(language),
    date: daterange,
    company: experience.Company,
    location: experience.Location,
  )

  #if "Situation" in experience [
    #par(justify: true)[#text(lang: "nl")[#experience.Situation.at(language)]]
  ]

  #if "Task" in experience [
    #if (language == "en") [Responsibilities] else [Verantwoordelijkheden]
    #for task in experience.Task.at(language) [

      - #strong(task.Task) #if "Action" in task [ #task.Action] #if (
          "Result" in task
        ) [#task.Result]
    ]
  ]

  #if "Keywords" in experience [
    #for keyword in experience.Keywords [
      #let k = data.Keywords.at(keyword)
      #emph(text(size: 1em)[#k.Name])
    ]]
]

