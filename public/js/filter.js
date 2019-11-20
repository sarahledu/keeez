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
allInput.forEach(input => {
  input.onclick = function(evt) {
    const checkedEmtObj = [];
    const checkedEmtTime = [];
    const checkedEmtArea = [];
    const rangeSelector = document.getElementById("range-input");
    const displayValue = document.getElementById("display-value");
    rangeSelector.oninput = function(evt) {
      const value = rangeSelector.value;
      displayValue.textContent = `${value}€`;
    };
    allInput.forEach(i => {
      if (i.checked === true) {
        if (i.getAttribute("data-obj")) {
          checkedEmtObj.push(i.getAttribute("data-obj"));
        } else if (i.getAttribute("data-time")) {
          checkedEmtTime.push(i.getAttribute("data-time"));
        } else if (i.getAttribute("data-area")) {
          checkedEmtArea.push(i.getAttribute("data-area"));
        }
      }
    });
    axios
      .post("http://localhost:9090/pro/search", {
        objectives: checkedEmtObj,
        timeline: checkedEmtTime,
        areas: checkedEmtArea,
        revenue: value
      })
      .then(myAPIRes => {
        const listUsers = myAPIRes.data;
        const tableContact = document.querySelector("#tbody-contacts");
        tableContact.innerHTML = "";
        listUsers.forEach(user => {
          console.log(user);
          tableContact.innerHTML += `<tr class="table-row">
              <td class="table-division">
                <div>${user.created_at}</div>
              </td>
              <td class="table-division">
                <div>${user.objectives}</div>
              </td>
              <td class="table-division">
                <div>${user.total_revenue}€</div>
              </td>
              <td class="table-division">
                <div>${user.areas}</div>
              </td>
              <td class="table-division">
                <div>${user.construction_works}</div>
              </td>
              <td class="table-division">
                <div><a href="/${user._id}" class="fas fa-cart-arrow-down"></a></div>
              </td>
              </tr>`;
        });
      })
      .catch(err => console.log(err));
  };
});

//FILTER RANGE REVENUE
