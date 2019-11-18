var checkLists = document.querySelectorAll(".dropdown-check-list");

checkLists.forEach(checkList => {
  checkList.querySelectorAll(".anchor")[0].onclick = function(evt) {
    const items = checkList.querySelector(".items");
    console.log(items);
    if (items.classList.contains("visible")) {
      items.classList.remove("visible");
      items.style.display = "none";
    } else {
      items.classList.add("visible");
      items.style.display = "block";
    }
    items.onblur = function(evt) {
      items.classList.remove("visible");
    };
  };
});
