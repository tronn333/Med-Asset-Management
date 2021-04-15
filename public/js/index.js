document.onscroll = function () { myFunction() };

let header = document.getElementById("myHeader");
let sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

const form = document.querySelector("#contactform")

form.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e);
  if (e.target.matches("#stringAdd")) {
    let counter = 1;
    let div = e.target.closest("div");
    console.log(div);
    let firstDiv = div.firstElementChild
    let clone = firstDiv.cloneNode(true);
    let arr = [...clone.children];
    for (let i = 0; i < arr.length; i++) {
      {
        let theName = arr[i].getAttribute('name');
        arr[i].setAttribute('name', theName + counter);
      }
    }
    counter += 1;
    console.log(clone);
    firstDiv.after(clone)
  }
})
