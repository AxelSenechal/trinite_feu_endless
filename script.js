let selected = {
  A: null,
  B: null,
  C: null
};

const panelTitle = document.getElementById("panel-title");
const itemList = document.getElementById("item-list");
const detailImage = document.getElementById("detail-image");
const detailComment = document.getElementById("detail-comment");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");

document.querySelectorAll(".point").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.point;
    showList(key);
  });
});

function showList(pointKey) {
  const point = DATA[pointKey];
  panelTitle.textContent = point.label;
  itemList.innerHTML = "";

  point.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.onclick = () => selectItem(pointKey, item);
    itemList.appendChild(li);
  });
}

function selectItem(pointKey, item) {
  selected[pointKey] = item;

  detailComment.textContent = item.comment;
  detailImage.src = item.image || "";

  checkCombination();
}

function checkCombination() {
  if (selected.A && selected.B && selected.C) {
    const key = `${selected.A.id}|${selected.B.id}|${selected.C.id}`;
    const combo = DATA.combinations[key];

    if (combo) {
      resultText.textContent = combo.result;
      resultImage.src = combo.image || "";
    } else {
      resultText.textContent = "Aucun résultat spécifique";
      resultImage.src = "";
    }
  }
}
