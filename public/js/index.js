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

form.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.matches("#stringAdd")) {
    e.preventDefault();
    let counter = 1;
    let div = e.target.closest("div");
    console.log(div);
    let firstDiv = div.firstElementChild
    let clone = firstDiv.cloneNode(true);
    let arr = [...clone.children];
    for (let i = 0; i < arr.length; i++) {
<<<<<<< HEAD
      let theName = arr[i].getAttribute("name");
      arr[i].setAttribute("name", theName + counter);
    }
    counter += 1;
    console.log(clone);
    div.after(clone);
=======
      {
        let theName = arr[i].getAttribute('name');
        arr[i].setAttribute('name', theName + counter);
      }
    }
    counter += 1;
    console.log(clone);
    firstDiv.after(clone)
>>>>>>> 0a7a19d547421e735edf59ab6d835f42f89b39cd
  }
});
