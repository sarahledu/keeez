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
    const data =obj.getAttribute("data-obj")
    axios.post("http://localhost:9090/pro/search", {objectives: data})
    .then(myAPIRes => {
      console.log(myAPIRes)

        // const filteredBoxes = myAPIRes.data;
   
        // const boxLayout = document.querySelector(".d-grid.boxes");
        // boxLayout.innerHTML = "";
        // filteredBoxes.forEach(box => {
        //     console.log(box)
        //     boxLayout.innerHTML += `<div class="box" style="background-color:${box.color}">${box.color}</div>`
        // });
        }).catch(err => console.log(err))
  };
});
