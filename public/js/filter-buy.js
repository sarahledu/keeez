var checkLists = document.querySelectorAll(".dropdown-check-list");

//enlever le cart du tableau au chargement de la page
function makesTheIconCartGoAway() {
  axios
    .get("/pro/dashboard/test")
    .then(ApiDbRes => {
      console.log(ApiDbRes.data);
      const listUsers = ApiDbRes.data;
      const tableContact = document.querySelector(".table");

      tableContact.innerHTML = `<div class="row header">
    <div class="cell">Have been looking since</div>
    <div class="cell">Objective(s)</div>
    <div class="cell">Budget</div>
    <div class="cell">Revenue</div>
    <div class="cell">Area</div>
    <div class="cell">Open to construction works</div>
    <div class="cell">Name</div>
    <div class="cell">Number</div>
    <div class="cell">Email</div>
</div>`;
      listUsers.forEach(user => {
        console.log(user);
        tableContact.innerHTML += `<div class="row">
      <div class="cell" data-title="Date">
        ${user.timeline}
      </div>
      <div class="cell" data-title="obj">
        ${user.objectives}
      </div>
      <div class="cell" data-title="budg">
        ${user.budget}
      </div>
      <div class="cell" data-title="rev">
        ${user.total_revenue}
      </div>
      <div class="cell" data-title="area">
        ${user.areas}
      </div>
      <div class="cell" data-title="works">
        ${user.construction_works}
      </div>
      <div class="cell" data-title="name">
        ${user.firstname} ${user.lastname}
      </div>
      <div class="cell" data-title="number">
        ${user.phone_number}
      </div>
      <div class="cell" data-title="email">
        ${user.email}
      </div>
    </div>`;
      });
    })
    .catch();
}
window.onload = makesTheIconCartGoAway;

// display the filters
checkLists.forEach(checkList => {
  checkList.querySelectorAll(".anchor")[0].onclick = function(evt) {
    const items = checkList.querySelector(".items");

    if (items.classList.contains("visible")) {
      items.classList.remove("visible");
      items.style.display = "none";
    } else {
      items.classList.add("visible");
      items.style.display = "block";
    }
  };
});

//CHECKBOX FILTERS
const allInput = document.querySelectorAll(".items input");
const rangeSelector = document.getElementById("range-input");
const budgetSelector = document.getElementById("range-budget");
const displayValue = document.getElementById("display-value");
const displayValueBudget = document.getElementById("display-value-2");

allInput.forEach(input => {
  input.oninput = function(evt) {
    const checkedEmtObj = [];
    const checkedEmtTime = [];
    const checkedEmtArea = [];
    const checkedEmtWorks = [];
    const value = rangeSelector.value;
    const budget = budgetSelector.value;
    displayValue.textContent = `${value}€ and more`;
    displayValueBudget.textContent = `${budget}€ and more`;

    allInput.forEach(i => {
      if (i.checked === true) {
        if (i.getAttribute("data-obj")) {
          checkedEmtObj.push(i.getAttribute("data-obj"));
        } else if (i.getAttribute("data-time")) {
          checkedEmtTime.push(i.getAttribute("data-time"));
        } else if (i.getAttribute("data-area")) {
          checkedEmtArea.push(i.getAttribute("data-area"));
        } else if (i.getAttribute("data-const")) {
          checkedEmtWorks.push(i.getAttribute("data-const"));
        }
      }
    });
    axios
      .post("/pro/search/contacts", {
        objectives: checkedEmtObj,
        timeline: checkedEmtTime,
        areas: checkedEmtArea,
        construction_works: checkedEmtWorks,
        revenue: value,
        budgeto: budget
      })
      .then(myAPIRes => {
        const listUsers = myAPIRes.data;
        const tableContact = document.querySelector(".table");

        tableContact.innerHTML = `<div class="row header">
        <div class="cell">Have been looking since</div>
        <div class="cell">Objective(s)</div>
        <div class="cell">Budget</div>
        <div class="cell">Revenue</div>
        <div class="cell">Area</div>
        <div class="cell">Open to construction works</div>
        <div class="cell">Name</div>
        <div class="cell">Number</div>
        <div class="cell">Email</div>
    </div>`;
        listUsers.forEach(user => {
          console.log(user);
          tableContact.innerHTML += `<div class="row">
          <div class="cell" data-title="Date">
            ${user.timeline}
          </div>
          <div class="cell" data-title="obj">
            ${user.objectives}
          </div>
          <div class="cell" data-title="budg">
            ${user.budget}
          </div>
          <div class="cell" data-title="rev">
            ${user.total_revenue}
          </div>
          <div class="cell" data-title="area">
            ${user.areas}
          </div>
          <div class="cell" data-title="works">
            ${user.construction_works}
          </div>
          <div class="cell" data-title="name">
          ${user.firstname} ${user.lastname}
        </div>
        <div class="cell" data-title="number">
          ${user.phone_number}
        </div>
        <div class="cell" data-title="email">
          ${user.email}
        </div>
        </div>`;
        });
      })
      .catch(err => console.log(err));
  };
});
