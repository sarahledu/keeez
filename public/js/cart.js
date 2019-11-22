//Paiement cart page
var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_p81G0llLiEjvzKpAdSOKhTO600sUeHVs9X",
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "keeyz",
    description: "My list of contacts",
    token: handleToken
  });
});

function handleToken(token) {
    fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(token)
    })
    .then(output => {
      if (output.status === "succeeded")
        document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
    })
  }