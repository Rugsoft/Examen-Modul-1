# Tallers del centre cívic

Pàgina web estàtica per consultar els tallers del centre cívic i preparar reserves de places amb validació al client. Desenvolupada en HTML5, CSS3 i JavaScript sense servidor ni dependències externes per a la prova pràctica de **MF0491** (`UF1841`, `UF1842` i `UF1843`).

## Com obrir-la

1. Obre directament el fitxer `index.html` amb qualsevol navegador web modern.
2. També es pot servir en local sense configuració addicional (no utilitza mòduls externs ni crides a servidor).

## Estructura del projecte

| Fitxer / Carpeta | Funció |
| :--- | :--- |
| `index.html` | Estructura semàntica (`header`, `nav`, `main`, `section`, `article`, `footer`), targetes dels tallers, formulari de reserva i regió d'estat per al resum. |
| `styles.css` | Estils *Mobile First* amb CSS Grid, paleta fosca d'alt contrast, focus visible per a teclat i adaptació a `360 px` i `1024 px`. |
| `app.js` | Array de tallers (`tallers`), càrrega dinàmica del `<select>`, validacions de formulari i funcions separades per calcular i mostrar el resum. |
| `img/` | Imatges locals dels tres tallers en format `16:9` (`fotografia-mobil.jpg`, `edicio-video.jpg`, `ceramica-creativa.jpg`). |
| `proves.txt` | Registre en text pla de les 5 proves del guió d'avaluació. |
| `proves.pdf` | Versió maquetada en PDF del registre de proves. |

## Funcionalitats principals

- **Tallers disponibles**: mostra *Fotografia amb mòbil* (12 €), *Edició de vídeo* (18 €) i *Ceràmica creativa* (15 €) amb el dia i el preu per plaça.
- **Validació al client**: comprova que el nom no estigui buit, que el correu tingui un format vàlid, que el taller existeixi i que les places siguin un enter entre `1` i `4`. Si hi ha errors, mostra un avís enfocable amb enllaços als camps i esborra el resum anterior.
- **Resum dinàmic accessible**: calcula l'import total, mostra les dades i la imatge del taller seleccionat dins d'una regió `role="status"` (`aria-live="polite"`) i substitueix el resum anterior en cada reserva vàlida.
- **Accessibilitat i responsive**: navegació completa amb teclat (`skip-link`, ordre lògic i contorn `:focus-visible`), etiquetes `<label for>` associades a cada camp i disseny sense desplaçament horitzontal a `360 px` ni a `1024 px`.
