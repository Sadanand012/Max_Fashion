
// import header and footer
import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
import { offer_navbar } from "../components/offern_navbar.js";
import { baseUrl } from "../config.mjs";


import { sendData } from "../components/filter.js";


// keys value pairs for search query
let serverKeys = {
  womenKurta: "Kurtas & Kurti",
  womenDresses: "Dresses",
  menTShirt: "T-Shirts",
  menCausalShirt: "Casual Shirts",
  menCaps: "Caps",
  girlsBackSchool: "Back To School",
  girlsToys: "Soft Toys",
  boysTees: "Tees & Polos",
  boySandles: "Sandals & Flip Flops",
};

document.getElementById("offer_s").innerHTML = offer_navbar();
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer_home();

let serchProduct = document.getElementsByClassName("serchProducts");
let cartQuantity = document.getElementById("cartQuantity");

let searchTitle = document.getElementById("searchTitle");
let container = document.getElementById("container");

let filterContainer =document.getElementById("filter_container");
let elementFind = document.getElementById("elementFind");

// localStorage keys
let maxCart = JSON.parse(localStorage.getItem("maxCart")) || [];
let maxFavourites = JSON.parse(localStorage.getItem("maxFavourites")) || [];
if (maxCart.length > 0) {
  cartQuantity.innerText = maxCart.length;
  cartQuantity.style.display = "block";
} else {
  cartQuantity.style.display = "none";
}
// ****** click event generated from navbar ---find query ******
//console.log(serchProduct);
for (let m = 0; m < serchProduct.length; m++) {
  serchProduct[m].addEventListener("click", function () {
    serchProducts(this);
  });
}
function serchProducts(trigger) {
  trigger = trigger.innerText;
  console.log(trigger);
  let serchKey;
  for (let i in serverKeys) {
    if (serverKeys[i] == trigger) {
      serchKey = i;
    }
  }
  console.log(trigger, serchKey);
  getData(serchKey, trigger);
}

// data fecth function *#*****#*

async function getData(query, serchTitle) {
  // let search = "Soft Toys";
  // let query = "menCaps";
  searchTitle.innerText = serchTitle;

  try {
    let url=`${baseUrl}/${query}`

    console.log(url)
    let res = await fetch(url);

    if (query == "girlsToys" || query == "boysTees") {
      container.style.background = "#eff0af";
    }
    let data = await res.json();
    console.log(data);
    if (data) {
      container.innerHTML = null;
    }
    sendData(data);
  } catch (err) {
    console.log(err.message);
    container.innerHTML = null;
    container.innerText = "Page not found....";
    container.style.color = "red";
    elementFind.innerText = "Please try to search different page";
    filterContainer.style.display= "none";
  }
}
getData("womenKurta", "Women");

// operation divs

// collecting data for various operations


