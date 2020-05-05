# Speicherung und Visualisierung von Graphdaten am Beispiel einer Diskografie

Eine Diskografie umfasst alle von einem Musiker veröffentlichen Tonträger und erschafft einen Überblick über all seine Kunstwerke. In den meisten Fällen werden Diskografien als einfacher Text oder eine Tabelle auf verschiedenen Webseiten aufgelistet.
Um den Datenumfang einer Diskografie zu demonstrieren wurde im Rahmen dieses Projektes die Diskografie des bekannten Jazz-Musikers Miles Davis analysiert. Sie besteht aus 307 Liedern, 51 Alben, 198 Musikern und 48 Musikinstrumenten (insgesamt 604 Objekte). Alle diese Informationen sind auf verschiedenen Webseiten wie Discogs (https://www.discogs. com/de/) und Wikipedia (https://de.wikipedia.org/) zu finden. Der Datenumfang ist bemerkenswert, alles ist in Textform verfasst und die Erkundung einer Diskografie bereitet kein Vergnügen. Das Ziel dieses Projektes ist die Entwicklung einer Web-Applikation, die die komplexen Diskografien mit wenig Text und vielen Bildern darstellt, sodass die Erkundung einer Diskografie möglichst einfach und benutzerfreundlich ist, außerdem sollte die Applikation mit verschiedenen Datensätzen funktionieren.

## Installation der Applikation
Laut den Anforderungen sollte die Web-Applikation statisch seit. Aus diesem Grund wurde in diesem Projekt eine Datespeicherung in Form von JSON-Dateien gewählt. Die Ergebnisse dieser Arbeit zeigen, dass solch eine Art der Datenspeicherung für eine erfolgreiche Implementierung geeignet ist. Der Nachteil dieser Vorgehensweise ist die anspruchsvolle Verwaltung und Pflege solcher Datensätze aufgrund der hohen Anzahl an Relationen zwischen den Objekten. Um Ihre Diskografie darstellen zu lassen, folgen Sie nächsten Schritten: 
1.  Klonen Sie das Projekt aus dem GitHub Repository mit dem folgenden Kommando: 
`git clone git@github.com:prozb/miles-davis-project.git`
2. Wechseln Sie in das Projektverzeichnis und installieren Sie alle Abhängigkeiten, die in diesem Projekt benötigt werden. Dazu benutzen Sie folgendes Kommando:
`cd miles-davis-project && npm install`
3. Erstellen Sie vier Dateien Ihrer Diskografie im passenden Format.
4. Kreieren Sie ein Verzeichnis und verschieben Sie Ihre Diskografie in dieses
Verzeichnis.
5. Verschieben Sie Ihr Verzeichnis mit Diskografien ins `public/discogs` Verzeichnis, damit die Applikation den Zugriff auf die Diskografie hat.
6. Starten Sie die Applikation mit folgendem Kommando: `npm start`.
7. Gehen Sie auf `localhost:3000` im Ihrem Browser.

## Datenstruktur einer Diskografie
Erstellen Sie Ihre Diskografien im folgenden Format. Bei Unverständlichkeiten schauen Sie bitte bereits erstellte Diskografien der Bands von Miles Davis oder Cream (sie sind im public/discogs Verzeichnis zu finden). 
Musician JSON Object            |  Album JSON Object
:-------------------------:|:-------------------------:
![Musician Object](https://github.com/prozb/miles-davis-project/blob/master/img/musician-json.png?raw=true)  |  ![Album Object](https://github.com/prozb/miles-davis-project/blob/master/img/album-json.png?raw=true)
Instrument JSON Object            |  Track JSON Object
![Instrument Object](https://github.com/prozb/miles-davis-project/blob/master/img/instrument-json.png?raw=true)  |  ![Track Object](https://github.com/prozb/miles-davis-project/blob/master/img/track-json.png?raw=true)

## Screenshots
![Album screen](https://github.com/prozb/miles-davis-project/blob/master/img/album-screen-nonav.png?raw=true "Album screen")
![Instrument screen](https://github.com/prozb/miles-davis-project/blob/master/img/instrument-end-screen.png?raw=true "Instrument screen")
![Musician screen](https://github.com/prozb/miles-davis-project/blob/master/img/musician-end-screen.png?raw=true "Musician screen")
![Track screen](https://github.com/prozb/miles-davis-project/blob/master/img/track-end-screen.png?raw=true "Track screen")
![Search screen](https://github.com/prozb/miles-davis-project/blob/master/img/search-filter.png?raw=true "Search screen")
![Tooltip](https://github.com/prozb/miles-davis-project/blob/master/img/tooltip-end-screen.png?raw=true "Tooltip")
![Special Screen](https://github.com/prozb/miles-davis-project/blob/master/img/special-end-screen.png?raw=true "Special Screen")

### Stack
* npm
* React.js
* JavaScript, HTML & CSS
* reactstrap
* material-ui
* fortawesome
* react-tippy
* cytoscape-popper
* react-router-dom
* react-avatar
