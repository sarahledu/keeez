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

//
// const objectives = document.querySelectorAll("[data-obj]");

// objectives.forEach(obj => {
//   obj.onclick = function(evt) {
//     const checkedElements = [];
//     objectives.forEach(input => {
//       if (input.checked === true)
//         checkedElements.push(input.getAttribute("data-obj"));
//     });
//     console.log(checkedElements);
//     axios
//       .post("http://localhost:9090/pro/search", { objectives: checkedElements })
//       .then(myAPIRes => {
//         const listUsers = myAPIRes.data;
//         const tableContact = document.querySelector("#tbody-contacts");
//         tableContact.innerHTML = "";
//         listUsers.forEach(user => {
//           console.log(user);
//           tableContact.innerHTML += `<tr class="table-row">
//           <td class="table-division">
//             <div>${user.created_at}</div>
//           </td>
//           <td class="table-division">
//             <div>${user.objectives}</div>
//           </td>
//           <td class="table-division">
//             <div>${user.total_revenue}€</div>
//           </td>
//           <td class="table-division">
//             <div>${user.areas}</div>
//           </td>
//           <td class="table-division">
//             <div>${user.construction_works}</div>
//           </td>
//           <td class="table-division">
//             <div><a href="/${user._id}" class="fas fa-cart-arrow-down"></a></div>
//           </td>
//           </tr>`;
//         });
//       })
//       .catch(err => console.log(err));
//   };
// });

//Select ALL
const allInput = document.querySelectorAll(".items input");
allInput.forEach(input => {
  input.onclick = function(evt) {
    const checkedEmtObj = [];
    const checkedEmtTime = [];
    const checkedEmtArea = [];
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
        areas: checkedEmtArea
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
