// ────────────────
// DONNÉES ÉDITABLES
// ────────────────

const DATA = {
  A: {
    label: "Carburant",
    items: [
      {
        id: "matiere",
        name: "Matière",
        comment: "Carburant de nature matérielle, tangible.",
        image: ""
      },
      {
        id: "liquide",
        name: "Liquide",
        comment: "Carburant fluide, adaptable et diffus.",
        image: ""
      }
    ]
  },

  B: {
    label: "Comburant",
    items: [
      {
        id: "air",
        name: "Air",
        comment: "Comburant naturel, omniprésent.",
        image: ""
      },
      {
        id: "mana",
        name: "Mana",
        comment: "Comburant magique, instable mais puissant.",
        image: ""
      },
      {
        id: "vie",
        name: "Vie",
        comment: "Comburant vital, lié à l’existence même.",
        image: ""
      }
    ]
  },

  C: {
    label: "Énergie",
    items: [
      {
        id: "mon_mana",
        name: "Mon mana",
        comment: "Énergie issue de la réserve personnelle de mana.",
        image: ""
      },
      {
        id: "ma_vie",
        name: "Ma vie",
        comment: "Énergie directement tirée de la force vitale.",
        image: ""
      }
    ]
  },

  combinations: {}
};

// ────────────────
// ÉTAT DE SÉLECTION
// ────────────────

const selected = {
  A: null,
  B: null,
  C: null
};

// ────────────────
// RÉFÉRENCES DOM
// ────────────────

const panelTitle = document.getElementById("panel-title");
const itemList = document.getElementById("item-list");
const detailImage = document.getElementById("detail-image");
const detailComment = document.getElementById("detail-comment");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");

// ────────────────
// INTERACTIONS
// ────────────────

document.querySelectorAll(".point").forEach(button => {
  button.addEventListener("click", () => {
    showList(button.dataset.point);
  });
});

function showList(pointKey) {
  const point = DATA[pointKey];
  panelTitle.textContent = point.label;
  itemList.innerHTML = "";

  point.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;

    if (selected[pointKey]?.id === item.id) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      selectItem(pointKey, item);
    });

    itemList.appendChild(li);
  });
}

function selectItem(pointKey, item) {
  selected[pointKey] = item;

  detailComment.textContent = item.comment;
  detailImage.src = item.image || "";
  detailImage.style.display = item.image ? "block" : "none";

  checkCombination();
}

function checkCombination() {
  if (selected.A && selected.B && selected.C) {
    const key = `${selected.A.id}|${selected.B.id}|${selected.C.id}`;
    const combo = DATA.combinations[key];

    if (combo) {
      resultText.textContent = combo.result;
      resultImage.src = combo.image || "";
      resultImage.style.display = combo.image ? "block" : "none";
    } else {
      resultText.textContent = "Aucun résultat spécifique";
      resultImage.style.display = "none";
    }
  }
}
