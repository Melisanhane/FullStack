Sekvenssikaavio:
https://studies.cs.helsinki.fi/exampleapp/notes

Serveri luo uuden tiedoston (new_note.html) POST -pyynöllä johon se lisää uuden syötetyn arvon listan loppuun. POST -pyyntö tehtiin Headerin osoittamaan paikkaan Location (/exampleapp/notes)
```
Selain -> serveri: GET https://studies.cs.helsinki.fi/exampleapp/new_note
    Pyyntö: POST
    Status koodi: 302
```
```
Selain -> serveri: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Pyyntö: GET
    Status koodi: 200
```
```
Selain -> serveri: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Pyyntö: GET
    Status koodi: 200
```
```
Selain -> serveri: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Pyyntö: GET
    Status koodi: 200
```