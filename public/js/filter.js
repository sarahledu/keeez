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
    // items.onblur = function(evt) {
    //   items.classList.remove("visible");
    // };

    // items.forEach(item=>{
    //   item.onclick = function(e){
    //     axios.post("http://localhost:9090/filter-results")
    //   }
    // })
  };
});

//
const objectives = document.querySelectorAll("[data-obj]");

objectives.forEach(obj => {
  obj.onclick = function(evt) {
    const checkedElements = [];
    objectives.forEach(input => {
      if (input.checked === true)
        checkedElements.push(input.getAttribute("data-obj"));
    });
    console.log(checkedElements);
    axios
      .post("http://localhost:9090/pro/search", { objectives: checkedElements })
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
