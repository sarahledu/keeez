var checkLists = document.querySelectorAll(".dropdown-check-list");
var cart = [];

//permet de visualiser quels éléments sont au panier au moment même après un refresh
function verifyCartAfterRefresh() {
  axios
    .get("/pro/get-cart")
    .then(dbApiRes => {
      dbApiRes.data.cart.forEach(elem => {
        const putIntoCartItems = document.getElementById(elem);
        putIntoCartItems.className = "fas fa-check-circle";
      });
    })
    .catch(err => console.log(err));
}

window.onload = verifyCartAfterRefresh();

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
      .post("/pro/search", {
        objectives: checkedEmtObj,
        timeline: checkedEmtTime,
        areas: checkedEmtArea,
        construction_works: checkedEmtWorks,
        revenue: value,
        budgeto: budget
      })
      .then(myAPIRes => {
        console.log(myAPIRes.data);
        const listUsers = myAPIRes.data;
        const tableContact = document.querySelector(".table");
        tableContact.innerHTML = `<div class="row header">
        <div class="cell">Have been looking since</div>
        <div class="cell">Objective(s)</div>
        <div class="cell">Budget</div>
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
          <div class="cell icon" data-title="cart">
          <a href="/${user._id}" id={{this._id}} data-id="${user._id}" 
          class="fas ${
            !cart.includes(user._id) ? "fa-plus-circle" : "fa-check-circle"
          }"></a>
          </div>
        </div>`;
        });
        initListener();
      })
      .catch(err => console.log(err));
  };
});

//Add to cart
const myCartBtn = document.getElementById("cart");
initListener();
function initListener() {
  const allBuyBtn = document.querySelectorAll(".fa-plus-circle");
  allBuyBtn.forEach(btn => {
    btn.onclick = function(evt) {
      const idNumber = evt.target.getAttribute("data-id");
      evt.preventDefault();
      // Add a small cart 'Are you sure you want to add this contact in your cart?""
      //send data to the server to add the element in our currentSessionUser
      axios
        .post(`/pro/search/add/${idNumber}`, {
          form_bought: idNumber
        })
        .then(dbAPIRes => {
          console.log(dbAPIRes);
          cart = dbAPIRes.data.cart;
          evt.target.className = `fas fa-check-circle`;
          myCartBtn.textContent = `Mon panier (${cart.length})`;
        }) // Check if our element has already been put her
        .catch(err => {
          console.log(err);
        });
      // Need to be sure when you change pages in the pro section you still have the right number in the cart
    };
  });
}
