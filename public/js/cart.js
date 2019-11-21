//Add to cart
const myCartBtn = document.getElementById("cart");
const allBuyBtn = document.querySelectorAll(".fa-cart-arrow-down");
var cartNumber = 0;
allBuyBtn.forEach(btn => {
  btn.onclick = function(evt) {
    const idNumber = evt.target.getAttribute("data-id");
    evt.preventDefault();
    // Add a small cart 'Are you sure you want to add this contact in your cart?""
    //send data to the DB to add the element in our currentSessionUser
    axios
      .post(`http://localhost:9090/pro/search/${idNumber}`, {
        form_bought: idNumber
      })
      .then(dbRes => {
        console.log("hello", dbRes);
      }) // Check if our element has already been put her
      .catch(err => {
        console.log(err);
      });
    cartNumber += 1; //Need to be the array.lenght of the element
    myCartBtn.textContent = `Mon Panier (${cartNumber})`;
    // Need to be sure when you change pages in the pro section you still have the right number in the cart
  };
});
