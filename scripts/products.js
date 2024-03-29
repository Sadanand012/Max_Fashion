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

// "girlsBackSchool"
// "girlsToys"
// "boysTees"
// "boySandles"

// import header and footer
import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
import { offer_navbar } from "../components/offern_navbar.js";

function x(id) {
  return document.getElementById(id);
}

document.getElementById("offer_s").innerHTML = offer_navbar();
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer_home();

let serchProduct = document.getElementsByClassName("serchProducts");
let cartQuantity = x("cartQuantity");

let searchTitle = x("searchTitle");
let container = x("container");

let operationFuncDiv = x("operationFuncDiv");
let elementFind = x("elementFind");
// let priceFuncDiv = create("div");
// priceFuncDiv.id = "priceFuncDiv";
// let sizeFuncDiv = create("div");
// sizeFuncDiv.id = "sizeFuncDiv";
//
// let extraFuncDiv = create("div");
// extraFuncDiv.id = "extraFuncDiv";

// localStorage keys
let maxCart = JSON.parse(localStorage.getItem("maxCart")) || [];
let Favourites = JSON.parse(localStorage.getItem("FavouriteProducts")) || [];
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
    let res = await fetch(`http://localhost:3000/${query}`);

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
    container.innerText = "Page not find....";
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

//                                             Display Function Main **/** */

let Display = (data) => {
  if (data) {
    container.innerHTML = null;
  }
  elementFind.innerText = data.length + "   Results found";

  data.forEach(({ image, title, price, color, size, online, extraInfo }, i) => {
    let images = [];
    images.push(image);
    let imgs = image.trim().split("");
    for (let i = 2; i < 7; i++) {
      let bag = "";
      bag += i;
      imgs.splice(-10, 1, bag);
      let createdImg = imgs.join("");
      images.push(createdImg);
    }
    data[images] = images;
    let productDiv = createDiv("productDiv");

    let div = createDiv("product");

    let addToFavorate = createDiv("addToFavorate");

    let favor = create("img");
    favor.src = "./images/favorite.png";
    addToFavorate.append(favor);

    // EventListener for add Favourite product
    addToFavorate.addEventListener("click", function () {
      addFavourites(this, data, i);
    });

    let div1 = createDiv("slider");
    let img = create("img");
    img.src = image;
    div1.append(img);

    div1.addEventListener("click", function () {
      window.location.href = "#";
    });

    // eventlistner for slider
    div1.addEventListener("mouseenter", function () {
      // if (call) {
      sliderStart(images, div1);
    });
    div1.addEventListener("mouseleave", function () {
      sliderStop(image, div1);
      // console.log(event);
    });

    let onlineDiv = create("div", online);
    onlineDiv.className = "onlineDiv";

    let newTitleDiv = create("div", extraInfo);
    newTitleDiv.className = "newTitleDiv";

    if (online == "") {
      onlineDiv.style.display = "none";
    }
    if (extraInfo == "") {
      newTitleDiv.style.display = "none";
    }
    let priceDiv = createDiv("priceDiv");
    let rupee = create("span", "₹");

    let mrp = create("h3", price);
    priceDiv.append(rupee, mrp);
    let name = create("p", title);
    //console.log(name);

    let leftArrow = createDiv("leftArrow");

    let lArrow = create("img");
    lArrow.src = "./images/left_Arrow.png";
    leftArrow.append(lArrow);
    // leftArrow.addEventListener("click", function () {
    //   // div1.style.transform = "translateX(-100%)";
    // });

    let rightArrow = createDiv("rightArrow");
    let rArrow = create("img");
    rArrow.src = "./images/right_Arrow.png";
    rightArrow.append(rArrow);

    div.append(
      addToFavorate,
      leftArrow,
      rightArrow,

      div1,
      newTitleDiv,
      onlineDiv,
      priceDiv,
      name
    );
    Favourites.forEach((el) => {
      if (el.title == data[i].title) {
        addFavourites(addToFavorate);
      }
    });
    let div2 = createDiv("disableBox");
    let productDetail = createDiv("productDetail");
    let productColor = createDiv("productColor");

    let colorBtn = createDiv("colorBtn");

    let colorImg = create("img");
    colorImg.src = images[0];
    let colorSpan = create("span", color[0]);
    let colorDownArray = create("img");
    colorBtn.append(colorImg, colorSpan, colorDownArray);
    let colorDiv = createDiv("colorDiv");

    // console.log(color.length);
    let elementImage = image;
    if (color.length > 1) {
      colorDownArray.src = "./images/icons8-down-24.png";
      color.forEach((el) => {
        let insideColorDiv = createDiv("insideColorDiv");

        let colorImg = create("img");

        data.forEach((element) => {
          if (element.title == title && element.image.includes(el)) {
            //  console.log(element, "****");
            colorImg.src = element.image;
            elementImage = element.image;
          }
        });

        let colorSpan = create("span", el);

        insideColorDiv.append(colorImg, colorSpan);

        // eventlitsner for change color
        insideColorDiv.addEventListener("click", function () {
          changeImageColor(colorBtn, elementImage, this, div1, colorDownArray);
          // console.log(this);
          colorDiv.style.display = "none";
        });
        colorDiv.append(insideColorDiv);
      });
    }

    productColor.append(colorBtn, colorDiv);

    // calling addevent lisner for enabling colorDiv
    colorBtn.addEventListener("click", function () {
      openDiv(colorDownArray, colorDiv, this);
      sizeDiv.style.display = "none";
    });

    // size Div
    let ProductSize = createDiv("ProductSize");

    let sizeBtnDiv = createDiv("sizeBtnDiv");

    let sizeBtn = create("span");
    let downArrow = create("img");

    sizeBtnDiv.append(sizeBtn, downArrow);

    // calling addevent lisner for enabling sizeDiv
    sizeBtnDiv.addEventListener("click", function () {
      openDiv(downArrow, sizeDiv, this);
      colorDiv.style.display = "none";
    });
    let sizeDiv = createDiv("sizeDiv");

    if (size.length > 0) {
      sizeBtn.innerText = "Select Size";
      downArrow.src = "./images/icons8-down-24.png";
      size.forEach((ele) => {
        let size = create("p", ele);
        // select size call function
        size.addEventListener("click", function () {
          selectSize(sizeBtn, this, downArrow);
          //  console.log(this);
          sizeDiv.style.display = "none";
        });

        sizeDiv.append(size);
      });
    }
    ProductSize.append(sizeBtnDiv, sizeDiv);

    // disble size btn when data not available
    if (size.length == 0) {
      productDetail.append(productColor);
      productColor.style.width = "100%";
    } else {
      productDetail.append(productColor, ProductSize);
    }

    // basket div
    let addBasketBtn = create("div", "ADD TO BASKET");
    addBasketBtn.className = "addBasketBtn";

    // add product to cart
    addBasketBtn.addEventListener("click", function () {
      if (sizeBtnDiv.innerText !== "Select Size") {
        data[i].color[0] = colorSpan.innerText;
        data[i].size[0] = sizeBtn.innerText;
        maxCart.push(data[i]);
        localStorage.setItem("maxCart", JSON.stringify(maxCart));
        alert("product added Succesfully!");
        cartQuantity.style.display = "block";
        cartQuantity.innerText = maxCart.length;
      } else {
        alert("please select product size");
      }
    });

    div2.append(productDetail, addBasketBtn);

    productDiv.append(div, div2);
    productDiv.addEventListener("mouseenter", function () {
      // if (call) {
      this.style.boxShadow = `rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`;
      this.style.padding = "20px";
      this.style.backgroundColor = "white";

      enable(div2, leftArrow, rightArrow, this);
    });
    productDiv.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
      this.style.padding = "0px";
      this.style.backgroundColor = "";
      enable(div2, leftArrow, rightArrow, this);
      disable(div2, colorDiv, sizeDiv, leftArrow, rightArrow);
      // console.log(event);
    });

    container.append(productDiv);
  });
};

let id;

function sliderStop(image, reset) {
  clearInterval(id);
  reset.innerHTML = null;

  let img = create("img");
  img.src = image;
  reset.append(img);
  reset.style.transform = "none";
  reset.style.transition = "";
  //console.log("***", id, img, reset);
}

// function sliderData(images, div1) {
//   div1.addEventListener("mouseenter", function () {
//     sliderData(images, div1);
//   });
// }

let sliderStart = (images, div1) => {
  let i = 1;
  let z = 0;
  id = setInterval(function () {
    // div1.innerHTML = null;

    if (i === images.length) {
      i = 0;
      // clearInterval(id);
    }

    let img = create("img");
    img.src = images[i];
    div1.append(img);
    // console.log(i, images.length);
    div1.style.transition = "0.7s";
    div1.style.transform = `translateX(${z * -100}%)`;

    i++;
    z++;
  }, 1800);
};

function openDiv(Arrow, enableDiv, parent) {
  // console.log(enableDiv.innerHTML == "");
  if (enableDiv.style.display == "block") {
    Arrow.src = "./images/icons8-down-24.png";
    enableDiv.style.display = "none";
    parent.style.border = "0.3px solid rgb(173, 173, 236)";
  } else {
    if (enableDiv.innerHTML !== "") {
      enableDiv.style.display = "block";
      Arrow.src = "./images/icons8-up-24.png";
    }
    parent.style.border = " 1px solid blue";
  }
}

function changeImageColor(colorBtn, Image, ImageDiv, container) {
  colorBtn.innerHTML = ImageDiv.innerHTML;
  let img = create("img");
  // console.log(Image, "***");
  container.innerHTML = null;

  img.src = Image;
  container.append(img);
  let Arrow = create("img");
  Arrow.src = "./images/icons8-down-24.png";
  colorBtn.append(Arrow);
  // call = false;
  // sliderData(Images, container);
}
function selectSize(sizeBtn, size, Arrow) {
  sizeBtn.innerHTML = size.innerHTML;
  sizeBtn.style.color = "black";
  Arrow.src = "./images/icons8-down-24.png";
}

// add Favourites products
function addFavourites(favor, data, product = null) {
  if (favor.style.backgroundColor == "pink") {
    favor.style.backgroundColor = "white";
    // console.log(Favourites);
    Favourites = Favourites.filter((el) => {
      return el.id !== data[product].id;
    });
  } else {
    favor.style.backgroundColor = "pink";
    if (product) Favourites.push(data[product]);
  }
  // console.log(Favourites);
  localStorage.setItem("FavouriteProducts", JSON.stringify(Favourites));
}

// enable disable products detail div***********
function enable(...Display) {
  Display.forEach((el) => {
    el.style.display = "block";
  });
}
function disable(...Display) {
  Display.forEach((el) => {
    if (el != "leftArrow" || el != "rightArrow") {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
  // disablDiv.style.display = "none";
  // colorDiv.style.display = "none";
  // sizeDiv.style.dis
}
