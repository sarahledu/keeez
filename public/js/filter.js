var checkLists = document.querySelectorAll(".dropdown-check-list");

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
const displayValue = document.getElementById("display-value");
allInput.forEach(input => {
  input.oninput = function(evt) {
    const checkedEmtObj = [];
    const checkedEmtTime = [];
    const checkedEmtArea = [];
    const checkedEmtWorks = [];
    const value = rangeSelector.value;
    displayValue.textContent = `${value}€ and more`;

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
      .post("http://localhost:9090/pro/search", {
        objectives: checkedEmtObj,
        timeline: checkedEmtTime,
        areas: checkedEmtArea,
        construction_works: checkedEmtWorks,
        revenue: value
      })
      .then(myAPIRes => {
        const listUsers = myAPIRes.data;
        const tableContact = document.querySelector(".table");
        console.log(tableContact);
        tableContact.innerHTML = `<div class="row header">
        <div class="cell">Have been looking since</div>
        <div class="cell">Objective(s)</div>
        <div class="cell">Revenue</div>
        <div class="cell">Area</div>
        <div class="cell">Open to construction works</div>
        <div class="cell">Cart</div>
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
          <div class="cell" data-title="rev">
            ${user.total_revenue}
          </div>
          <div class="cell" data-title="area">
            ${user.areas}
          </div>
          <div class="cell" data-title="works">
            ${user.construction_works}
          </div>
          <div class="cell icon" data-title="cart">
            <a href="/${user._id}" class="fas fa-cart-arrow-down"></a>
          </div>
        </div>`;
        });
      })
      .catch(err => console.log(err));
  };
});

//FILTER RANGE REVENUE
