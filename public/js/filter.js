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
const objectives = document.querySelectorAll(".")
