document.onscroll = function () {
  myFunction();
};

let header = document.getElementById("myHeader");
let sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

const form = document.querySelector("#contactform");
const anestasiaAr = document.getElementsByName("anestasia");
const anestasia = anestasiaAr[0];
const hranestesia = document.getElementById("anestesia1");
const divanestesia = document.getElementById("anestesia")
const subpodryadAr = document.getElementsByName("subpodryad");
const subpodryad = subpodryadAr[0];
const subpodryadDiv1 = document.getElementById("subpodryad1")
const subpodryadHr1 = document.getElementById("subpodryad2")
const subpodryadDiv2 = document.getElementById("subpodryad3")
const subpodryadHr2 = document.getElementById("subpodryad4")




form.addEventListener("click", (e) => {
  //console.log(e);
  if (e.target.matches("#stringAdd")) {
    e.preventDefault();
    let counter = 1;
    let div = e.target.closest("div");
    console.log(div);
    let firstDiv = div.firstElementChild
    let clone = firstDiv.cloneNode(true);
    let arr = [...clone.children];
    for (let i = 0; i < arr.length; i++) {
      let theName = arr[i].getAttribute('name');
      arr[i].value = ""
      arr[i].setAttribute('name', theName + counter);
    }
    counter += 1;
    console.log(clone);
    firstDiv.after(clone)
  }
});


anestasia.addEventListener("change", () => {
  if (anestasia.value === "1") {
    hranestesia.style = "display"
    divanestesia.style = "display"
  }
}, false)

subpodryad.addEventListener("change", () => {
  if (subpodryad.value === "1") {
    subpodryadDiv1.style = "display"
    subpodryadHr1.style = "display"
    subpodryadDiv2.style = "display"
    subpodryadHr2.style = "display"
  }
}, false)

