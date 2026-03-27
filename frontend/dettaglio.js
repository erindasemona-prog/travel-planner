function goBack() {
  window.location.href = "index.html";
}

const suggerimenti = {
  Roma: ["Colosseo", "Fontana di Trevi", "Vaticano"],
  Milano: ["Duomo", "Navigli", "Castello Sforzesco"],
  Parigi: ["Torre Eiffel", "Louvre", "Notre-Dame"]
};

const params = new URLSearchParams(window.location.search);
const tripId = params.get("tripId");
const tripTitle = params.get("title");
const citta = params.get("citta");

let luoghi = [];

function getStorageKey() {
  return `luoghi_${tripId || "default"}`;
}

function saveLuoghi() {
  localStorage.setItem(getStorageKey(), JSON.stringify(luoghi));
}

function loadLuoghi() {
  const salvati = localStorage.getItem(getStorageKey());
  luoghi = salvati ? JSON.parse(salvati) : [];
}

function caricaSuggerimentiSeVuoto() {
  if (luoghi.length > 0) return;
  if (!citta || !suggerimenti[citta]) return;

  luoghi = suggerimenti[citta].map((nome) => ({
    nome,
    note: "",
    visitato: false
  }));

  saveLuoghi();
}

function aggiungiLuogo() {
  const nome = document.getElementById("nomeLuogo").value;
  const note = document.getElementById("noteLuogo").value;

  if (!nome) return;

  const luogo = {
    nome,
    note,
    visitato: false
  };

  luoghi.push(luogo);
  saveLuoghi();
  render();
}

function toggleVisitato(index) {
  luoghi[index].visitato = !luoghi[index].visitato;
  saveLuoghi();
  render();
}

function eliminaLuogo(index) {
  luoghi.splice(index, 1);
  saveLuoghi();
  render();
}

function render() {
  const lista = document.getElementById("listaLuoghi");
  lista.innerHTML = "";

  luoghi.forEach((luogo, index) => {
    const div = document.createElement("div");

    div.className = luogo.visitato ? "visitato" : "da-vedere";

    div.innerHTML = `
      <strong>${luogo.nome}</strong><br>
      <small>${luogo.note || ""}</small><br>

      <p>${luogo.visitato ? "Già visitato" : "Da vedere"}</p>

      <button onclick="toggleVisitato(${index})">
        ${luogo.visitato ? "Segna da vedere" : "Segna visitato"}
      </button>

      <button onclick="eliminaLuogo(${index})">
        Elimina
      </button>
    `;

    lista.appendChild(div);
  });
}

function initPage() {
  const titoloEl = document.getElementById("titoloViaggio");
  if (titoloEl) {
    if (tripTitle) {
      titoloEl.textContent = `Viaggio: ${tripTitle}`;
    } else if (citta) {
      titoloEl.textContent = `Viaggio a ${citta}`;
    } else if (tripId) {
      titoloEl.textContent = `Viaggio #${tripId}`;
    }
  }

  loadLuoghi();
  caricaSuggerimentiSeVuoto();
  render();
}

initPage();
