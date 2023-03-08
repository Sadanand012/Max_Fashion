
// import header and footer
import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
import { offer_navbar } from "../components/offern_navbar.js";
import { baseUrl } from "../config.mjs";

import { Display } from "../components/product.js";


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

// ID create function
// function createID(id) {
//   return document.getElementById(id);
// }

document.getElementById("offer_s").innerHTML = offer_navbar();
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer_home();

let serchProduct = document.getElementsByClassName("serchProducts");
let cartQuantity = document.getElementById("cartQuantity");

let searchTitle = document.getElementById("searchTitle");
let container = document.getElementById("container");

let operationFuncDiv =document.getElementById("operationFuncDiv");
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
    let res = await fetch(`${baseUrl}/${query}`);

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
    operationFuncDiv.innerHTML = null;
  }
}
getData("womenKurta", "Women");

// operation divs

// collecting data for various operations

function sendData(data) {
  let min = Infinity;
  let max = -Infinity;
  let diffrentSizes = {};
  let diffrentColors = {};
  let tags = {};
  data.forEach(({ price, color, size, online, extraInfo }) => {
    let bag = "";
    for (let i = 0; i < price.length; i++) {
      if (price[i] != ",") {
        bag += price[i];
      }
    }
    let MRP = Number(bag);
    // console.log(MRP, "*3#");

    if (min > MRP) {
      min = MRP;
    }
    if (max < MRP) {
      max = MRP;
    }

    for (let siz of size) {
      diffrentSizes[siz] == undefined
        ? (diffrentSizes[siz] = 1)
        : diffrentSizes[siz]++;
    }

    for (let col of color) {
      diffrentColors[col] == undefined
        ? (diffrentColors[col] = 1)
        : diffrentColors[col]++;
    }
    tags[online] == undefined ? (tags[online] = 1) : tags[online]++;
    tags[extraInfo] == undefined ? (tags[extraInfo] = 1) : tags[extraInfo]++;
  });
  Display(data);

  console.log(min, max, diffrentSizes, diffrentColors, tags);
  diifFunctions(min, max, diffrentSizes, diffrentColors, tags, data);
}

// fucnction box--------------------------------------------------------------------------------------------------filtering
function diifFunctions(min, max, diffrentSizes, diffrentColors, tags, data) {
  // colourFuncDiv.innerHTML = null;
  // extraFuncDiv.innerHTML = null;
  // elementFind.innerHTML = null;
  let sizeFuncDiv = create("div");
  sizeFuncDiv.id = "sizeFuncDiv";
  if (Object.keys(diffrentSizes).length !== 0) {
    let sizeFuncBtn = createDiv("sizeFuncBtn");

    let sz = create("p", "Size");
    let sizeFuncRes = createDiv("sizeFuncRes");
    let Arrow = create("img");
    Arrow.src = "./images/icons8-down-24.png";
    sizeFuncBtn.append(sz, Arrow);
    let clk = true;
    sizeFuncBtn.addEventListener("click", function () {
      if (clk) {
        sizeFuncRes.style.display = "block";
        Arrow.src = "./images/icons8-up-24.png";
        sizeFuncDiv.style.border = "1px solid blue";
      } else {
        sizeFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        sizeFuncDiv.style.border = "0.3px solid gray";
      }
      clk = !clk;
    });

    for (let i in diffrentSizes) {
      let size = create("p", i);
      let quan = create("span", "(" + diffrentSizes[i] + ")");
      size.append(quan);

      size.addEventListener("click", function () {
        console.log(this.innerText);
        let findSize = this.innerText;
        let bag = "";
        for (let i = 0; i < findSize.length; i++) {
          if (findSize[i] == "(") break;
          bag += findSize[i];
        }
        let filterData = data.filter((el) => {
          let flag = false;
          el.size.forEach((ele) => {
            if (ele == bag) {
              flag = true;
            }
          });
          if (flag) return el;
        });
        Display(filterData);
        sizeFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        sizeFuncDiv.style.border = "0.3px solid gray";
      });
      sizeFuncRes.append(size);
    }
    console.log(sizeFuncRes);
    sizeFuncDiv.append(sizeFuncBtn, sizeFuncRes);
  }
  let extraFuncDiv = create("div");
  extraFuncDiv.id = "extraFuncDiv";
  console.log(1);
  if (Object.keys(tags).length !== 0) {
    let sizeFuncBtn = createDiv("sizeFuncBtn");

    let sz = create("p", "Browse");
    let sizeFuncRes = createDiv("sizeFuncRes");
    let Arrow = create("img");
    Arrow.src = "./images/icons8-down-24.png";
    sizeFuncBtn.append(sz, Arrow);
    let clk = true;
    sizeFuncBtn.addEventListener("click", function () {
      if (clk) {
        sizeFuncRes.style.display = "block";
        Arrow.src = "./images/icons8-up-24.png";
        sizeFuncDiv.style.border = "1px solid blue";
      } else {
        sizeFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        sizeFuncDiv.style.border = "0.3px solid gray";
      }
      clk = !clk;
    });

    for (let i in tags) {
      let size = create("p", i);
      let quan = create("span", "(" + tags[i] + ")");
      if (size.innerText != "") {
        size.append(quan);
      }

      size.addEventListener("click", function () {
        console.log(this.innerText);
        let findSize = this.innerText;
        let bag = "";
        for (let i = 0; i < findSize.length; i++) {
          if (findSize[i] == "(") break;
          bag += findSize[i];
        }
        let filterData = data.filter((el) => {
          let flag = false;
          el.extraInfo.forEach((ele) => {
            if (ele == bag) {
              flag = true;
            }
          });
          el.new.forEach((ele) => {
            if (ele == bag) {
              flag = true;
            }
          });
          if (flag) return el;
        });
        Display(filterData);
        sizeFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        sizeFuncDiv.style.border = "0.3px solid gray";
      });
      sizeFuncRes.append(size);
    }
    console.log(sizeFuncRes);
    extraFuncDiv.innerHTML = null;
    extraFuncDiv.append(sizeFuncBtn, sizeFuncRes);
  }

  console.log(1);
  let colourFuncDiv = create("div");
  colourFuncDiv.id = "colourFuncDiv";
  if (Object.keys(diffrentColors).length !== 0) {
    let colorFuncBtn = createDiv("colorFuncBtn");

    let col = create("p", "Color");
    let colorFuncRes = createDiv("colorFuncRes");
    let Arrow = create("img");
    Arrow.src = "./images/icons8-down-24.png";
    colorFuncBtn.append(col, Arrow);
    let clk = true;
    colorFuncBtn.addEventListener("click", function () {
      if (clk) {
        colorFuncRes.style.display = "block";
        Arrow.src = "./images/icons8-up-24.png";
        colourFuncDiv.style.border = "1px solid blue";
      } else {
        colorFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        colourFuncDiv.style.border = "0.3px solid gray";
      }
      clk = !clk;
    });

    for (let i in diffrentColors) {
      let color = create("p", i);
      let quan = create("span", "(" + diffrentColors[i] + ")");
      color.append(quan);

      color.addEventListener("click", function () {
        console.log(this.innerText);
        let findColor = this.innerText;
        let bag = "";
        for (let i = 0; i < findColor.length; i++) {
          if (findColor[i] == "(") break;
          bag += findColor[i];
        }
        let filterData = data.filter((el) => {
          let flag = false;
          el.color.forEach((ele) => {
            if (ele == bag) {
              flag = true;
            }
          });
          if (flag) return el;
        });
        Display(filterData);
        colorFuncRes.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        colourFuncDiv.style.border = "0.3px solid gray";
      });
      colorFuncRes.append(color);
    }
    console.log(colorFuncRes);

    colourFuncDiv.append(colorFuncBtn, colorFuncRes);
    operationFuncDiv.innerHTML = null;
    operationFuncDiv.append(sizeFuncDiv, colourFuncDiv, extraFuncDiv);
  }
}

// constructor function for create element with innertext
function create(element, text = "") {
  let ele = document.createElement(element);
  ele.innerText = text;

  return ele;
}

// constructor function for create div with className
function createDiv(classname = "") {
  let el = document.createElement("div");
  el.className = classname;
  return el;
}



