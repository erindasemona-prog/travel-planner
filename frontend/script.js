const form = document.querySelector("form");
const lista = document.querySelector("ul");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // prendi input
  const inputs = document.querySelectorAll("input");
  const titolo = inputs[0].value;
  const citta = inputs[1].value;

  if (titolo === "" || citta === "") return;

  // crea elemento
  const li = document.createElement("li");

  li.innerHTML = `
    <span><strong>${titolo}</strong> - ${citta}</span>
    <div>
      <span class="badge da-vedere">Da vedere</span>
      <button class="delete-btn">Elimina</button>
    </div>
  `;

  // ELIMINA
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  // CAMBIA STATO (badge)
  const badge = li.querySelector(".badge");

  badge.addEventListener("click", () => {
    if (badge.classList.contains("da-vedere")) {
      badge.classList.remove("da-vedere");
      badge.classList.add("visitato");
      badge.textContent = "Visitato";
    } else {
      badge.classList.remove("visitato");
      badge.classList.add("da-vedere");
      badge.textContent = "Da vedere";
    }
  });

  // aggiungi alla lista
  lista.appendChild(li);

  // reset form
  form.reset();
});
