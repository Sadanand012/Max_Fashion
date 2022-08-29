import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
import { offer_navbar } from "../components/offern_navbar.js";
document.getElementById("offer_s").innerHTML = offer_navbar();
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer_home();
let cartQuantity = document.getElementById("cartQuantity");

// let data1 = [
//   {
//     Image:
//       "https://lmsin.net/cdn-cgi/image/h=831,w=615,q=60,fit=cover/https://aaeff43fe32172cbcecc-ae2a4e9a8cbc330ede5588dedf56886e.lmsin.net/max/1000011359693-Red-RED-1000011359693-31072022_01-2100.jpg",
//     heading: "Tshirt",
//     amount: "299",
//     rang: "blue",
//     lngth: "xl",
//   },
//   {
//     Image:
//       "https://lmsin.net/cdn-cgi/image/h=831,w=615,q=60,fit=cover/https://aaeff43fe32172cbcecc-ae2a4e9a8cbc330ede5588dedf56886e.lmsin.net/max/1000011359693-Red-RED-1000011359693-31072022_01-2100.jpg",
//     heading: "Tshirt",
//     amount: "299",
//     rang: "blue",
//     lngth: "xl",
//   },
// ];
//maxCart
// localStorage.setItem("data", JSON.stringify(data1));
let data = JSON.parse(localStorage.getItem("maxCart")) || [];
cartQuantity.innerText = data.length;
console.log(data);
let left = document.getElementById("card");

let Append = (data) => {
  var count = 0;
  let p = 0;
  left.innerHTML = null;
  data.forEach((e, i) => {
    let product = document.createElement("div");
    product.id = "product";

    let im = document.createElement("div");
    im.id = "im";

    let imgg = document.createElement("img");

    imgg.id = "imgg";

    imgg.src = e.image;

    im.append(imgg);

    let detail = document.createElement("div");
    detail.id = "detail";

    let title = document.createElement("h4");

    title.innerText = e.title;

    let price = document.createElement("h4");
    price.innerText = `₹ ${e.price}`;

    let color = document.createElement("h6");
    color.innerText = `Color:${e.color[0]}`;

    let size = document.createElement("h6");
    size.innerText = `Size:${e.size[0]}`;

    detail.append(title, price, color, size);

    //let hr=document.createElement("hr");
    let ftr = document.createElement("div");
    let h60 = document.createElement("h6");
    h60.innerHTML = "Delivery in Enter Pincode above";
    h60.id = "fxx";

    ftr.append(h60);

    let bt = document.createElement("div");
    bt.id = "btn";
    let remove = document.createElement("button");
    remove.id = "Remove";
    remove.innerHTML = "Remove";
    remove.addEventListener("click", function () {
      fremove(e, i);
    });

    let Move = document.createElement("button");
    Move.id = "move";
    Move.innerHTML = "Move to favourites";

    bt.append(remove, Move);
    ftr.append(bt);
    product.append(im, detail);
    left.append(product, ftr);
    count++;
    p = p + +e.price;
  });
  console.log(count);
  console.log(p);
  document.getElementById("count").innerHTML = `${count} Product`;
  document.getElementById("amtt").innerHTML = `${p}`;
  document.getElementById("ctt").innerHTML = `${p}`;
};

function fremove(e, i) {
  data.splice(e, 1);
  localStorage.setItem("maxCart", JSON.stringify(data));
  cartQuantity.innerText = data.length;
  Append(data);
}
Append(data);

document.querySelector("form").addEventListener("submit", function (e) {
  let pin = [82801, 751025, 82811, 80801];
  let check = document.getElementById("pincode").value;
  function ans() {
    for (let i = 0; i < pin.length; i++) {
      if (pin[i] == check) {
        console.log("true");
        break;
      }
      console.log("false");
    }
  }
  let x = ans();
  console.log(x);
  if (x == true) {
    alert("Delivery Abailable");
  } else {
    alert("Sorry");
  }
});

let clickonnew = document.getElementById("checkout");
clickonnew.addEventListener("click", function () {
  window.location.href = "checkout.html";
});
