function addRow() {
  const day = document.getElementById("day").value;
  const place = document.getElementById("place").value;
  const priceOptions = Number(document.getElementById("priceOptions").value);
  let  people = document.getElementById("people").value;
  const note = document.getElementById("note").value;

 if (
  !day.trim() ||
  !place.trim() ||
  priceOptions === "" ||
  people === ""
) {
  alert("日期、地點、金額、預付人不能空白！");
  return;
}
switch (people){
  case "people1":
    people = "岑"
    break;
  case "people2":
    people = "鎧"
    break;
  case "people3":
    people = "樺"
    break;
  case "people4":
    people = "穎"
    break;
  case "people5":
    people = "禹"
    break;
  case "people6":
    people = "榕"
    break;
  default:
    people = "沒有人"
}

  const table = document.getElementById("tripTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${day}</td>
    <td>${place}</td>
    <td>₩${priceOptions}</td>
    <td>${people}</td>
    <td>${note}</td>
    <td>
      <button onclick="editRow(this)">修改</button>
      <button onclick="deleteRow(this)">刪除</button>
    </td>
  `;

  document.getElementById("day").value = "";
  document.getElementById("place").value = "";
  document.getElementById("priceOptions").value = "";
  document.getElementById("people").value = "";
  document.getElementById("note").value = "";
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function editRow(button) {
  const row = button.parentNode.parentNode;
  const cells = row.getElementsByTagName("td");

  const day = prompt("修改日期：", cells[0].innerText);
  const place = prompt("修改地點：", cells[1].innerText);
  const priceOptions = prompt("修改金額：", cells[2].innerText);
  const people = prompt("修改預付人：", cells[3].innerText);
  const note = prompt("修改備註：", cells[4].innerText);

  if (day && place) {
    cells[0].innerText = day;
    cells[1].innerText = place;
    cells[2].innerText = priceOptions;
    cells[3].innerText = people;
    cells[4].innerText = note;
  } else {
    alert("日期、地點、金額、預付人不能空白!");
  }
}
