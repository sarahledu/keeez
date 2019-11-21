function yesnoCheck() {
  

  if (document.getElementById("yesCheck").checked) {
    document.querySelectorAll(".ifYes").forEach(e => {
      console.log(e);
      e.style.display = "block";
    });
  } else {
    document.querySelectorAll(".ifYes").forEach(e => {
      e.style.display = "none";
    });
  }
}

document.getElementById("yesCheck").onclick = yesnoCheck;
document.getElementById("noCheck").onclick = yesnoCheck;
