Sekvenssikaavio:
https://studies.cs.helsinki.fi/exampleapp/spa 

Serveri luo ainoastaan yhden uuden tiedoston (new_note_spa.xhr).
Pyyntö kohdistuu JSON contentiin (application/json; charset=utf-8).
Lomakkeelle ei ole määritelty action- eikä method- attribuutteja kuten ensimmäisessä lomakkeessa oli vaan JS hakee sijainnin ID:n kautta. 
Näin lomake luodaan JS koodissa ja ei tehdä turhia sivulatauksia.

```
Selain ->> serveri: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
**Pyyntö: POST**
**Status koodi: 201**
    Luodaan JavaScriptissä uusi lomake dokumentin ID:n perusteella tehtävään tapahtumankäsittelijään
```