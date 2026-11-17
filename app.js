const tallers = [
  { id: "foto-mobil", nom: "Fotografia amb mòbil", preu: 12, imatge: "img/fotografia-mobil.jpg" },
  { id: "edicio-video", nom: "Edició de vídeo", preu: 18, imatge: "img/edicio-video.jpg" },
  { id: "ceramica", nom: "Ceràmica creativa", preu: 15, imatge: "img/ceramica-creativa.jpg" }
];

const formReserva = document.getElementById("formReserva");
const inputNom = document.getElementById("nom");
const inputCorreu = document.getElementById("correu");
const selectTaller = document.getElementById("taller");
const inputPlaces = document.getElementById("places");
const avisErrors = document.getElementById("avisErrors");
const resumDiv = document.getElementById("resum");

const errorNom = document.getElementById("errorNom");
const errorCorreu = document.getElementById("errorCorreu");
const errorTaller = document.getElementById("errorTaller");
const errorPlaces = document.getElementById("errorPlaces");

function carregarSelectorTallers() {
  const opcioInicial = document.createElement("option");
  opcioInicial.value = "";
  opcioInicial.textContent = "-- Selecciona un taller --";
  selectTaller.appendChild(opcioInicial);

  tallers.forEach(function (taller) {
    const opcio = document.createElement("option");
    opcio.value = taller.id;
    opcio.textContent = taller.nom + " (" + taller.preu + " €)";
    selectTaller.appendChild(opcio);
  });
}

function esCorreuValid(correu) {
  const patro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patro.test(correu);
}

// Càlcul i presentació separats en funcions independents
function calcularTotal(preuPerPlaca, places) {
  return preuPerPlaca * places;
}

function mostrarResum(nomPersona, taller, places, total) {
  resumDiv.innerHTML = "";

  const targetaResum = document.createElement("div");
  targetaResum.classList.add("resum-targeta");

  const imgTaller = document.createElement("img");
  imgTaller.classList.add("resum-img");
  imgTaller.src = taller.imatge;
  // Imatge decorativa: el nom del taller ja s'anuncia al text del resum
  imgTaller.alt = "";
  imgTaller.width = 1024;
  imgTaller.height = 571;

  const pNom = document.createElement("p");
  pNom.textContent = "Nom: " + nomPersona;

  const pTaller = document.createElement("p");
  pTaller.textContent = "Taller: " + taller.nom;

  const pPlaces = document.createElement("p");
  pPlaces.textContent = "Nombre de places: " + places;

  const pTotal = document.createElement("p");
  pTotal.classList.add("resum-total");
  pTotal.textContent = "Total: " + total + " €";

  targetaResum.appendChild(imgTaller);
  targetaResum.appendChild(pNom);
  targetaResum.appendChild(pTaller);
  targetaResum.appendChild(pPlaces);
  targetaResum.appendChild(pTotal);

  resumDiv.appendChild(targetaResum);
}

function netejarResum() {
  resumDiv.innerHTML = "";
}

function marcarErrorCamp(camp, contenidorError, missatge) {
  camp.parentElement.classList.add("con-error");
  camp.setAttribute("aria-invalid", "true");
  contenidorError.textContent = missatge;
}

function mostrarAvisErrors(errors) {
  avisErrors.innerHTML = "";

  const titol = document.createElement("p");
  titol.textContent = "Revisa els camps marcats abans de continuar:";
  avisErrors.appendChild(titol);

  const llista = document.createElement("ul");
  llista.classList.add("llista-errors");

  errors.forEach(function (error) {
    const item = document.createElement("li");
    const enllac = document.createElement("a");
    enllac.href = "#" + error.campId;
    enllac.textContent = error.missatge;
    item.appendChild(enllac);
    llista.appendChild(item);
  });

  avisErrors.appendChild(llista);
  avisErrors.hidden = false;
  avisErrors.focus();
}

function netejarErrors() {
  const camps = [
    { camp: inputNom, error: errorNom },
    { camp: inputCorreu, error: errorCorreu },
    { camp: selectTaller, error: errorTaller },
    { camp: inputPlaces, error: errorPlaces }
  ];

  camps.forEach(function (item) {
    item.camp.parentElement.classList.remove("con-error");
    item.camp.removeAttribute("aria-invalid");
    item.error.textContent = "";
  });

  avisErrors.innerHTML = "";
  avisErrors.hidden = true;
}

formReserva.addEventListener("submit", function (event) {
  event.preventDefault();
  netejarErrors();

  const errors = [];

  const nom = inputNom.value.trim();
  if (nom === "") {
    const msg = "Camp Nom complet: escriu el teu nom (no pot quedar buit).";
    marcarErrorCamp(inputNom, errorNom, msg);
    errors.push({ campId: "nom", missatge: msg });
  }

  const correu = inputCorreu.value.trim();
  if (!esCorreuValid(correu)) {
    const msg = "Camp Correu electrònic: introdueix un correu vàlid (exemple: nom@domini.cat).";
    marcarErrorCamp(inputCorreu, errorCorreu, msg);
    errors.push({ campId: "correu", missatge: msg });
  }

  const tallerSeleccionat = tallers.find(function (taller) {
    return taller.id === selectTaller.value;
  });
  if (!tallerSeleccionat) {
    const msg = "Camp Taller: selecciona un taller disponible de la llista.";
    marcarErrorCamp(selectTaller, errorTaller, msg);
    errors.push({ campId: "taller", missatge: msg });
  }

  // badInput captura entrades mal formades en alguns navegadors abans de convertir a Number
  const placesText = inputPlaces.value.trim();
  const placesNum = Number(placesText);
  if (
    inputPlaces.validity.badInput ||
    placesText === "" ||
    !Number.isInteger(placesNum) ||
    placesNum < 1 ||
    placesNum > 4
  ) {
    const msg = "Camp Nombre de places: introdueix un número enter entre 1 i 4.";
    marcarErrorCamp(inputPlaces, errorPlaces, msg);
    errors.push({ campId: "places", missatge: msg });
  }

  if (errors.length > 0) {
    netejarResum();
    mostrarAvisErrors(errors);
    return;
  }

  const total = calcularTotal(tallerSeleccionat.preu, placesNum);
  mostrarResum(nom, tallerSeleccionat, placesNum, total);
});

carregarSelectorTallers();
