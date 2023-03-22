//                                  Display Function Main **/** */

let z = 0;
let i = 1;
let id;
let container = document.getElementById("container");
let elementFind = document.getElementById("elementFind");

let maxFavourites = JSON.parse(localStorage.getItem("maxFavourites")) || [];

// constructor function for create element with inertext
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

export let Display = (data) => {
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

    let productInfo = createDiv("product");
    let imageDiv = createDiv("imageDiv");

    let addToFavorate = createDiv("addToFavorate");

    let favor = create("img");
    favor.src = "./images/favorite.png";
    addToFavorate.append(favor);

    // EventListener for add Favourite product
    addToFavorate.addEventListener("click", function () {
      addFavourites(this, data, i);
    });

    let sliderDiv = createDiv("slider");
    let img = create("img");
    img.src = image;
    sliderDiv.append(img);

    sliderDiv.addEventListener("click", function () {
      window.location.href = "#";
    });

    productDiv.addEventListener("mouseenter", function () {
        i=0;
        z=0
      id = setInterval(function () {
       slide(images,sliderDiv)
      }, 1800);
      
      
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
    leftArrow.addEventListener("click", function () {
      clearInterval(id);
      z--;

      if (z === 0) {
        z = images.length-1;
        sliderDiv.style.transform = `translateX(${z * 100}%)`;
      }
      while(i!== images.length){
      let img = create("img");
      img.src = images[i];
      sliderDiv.append(img);
      i++
      }
  
      sliderDiv.style.transition = "0.7s";
      sliderDiv.style.transform = `translateX(${z * -100}%)`;
     
      
   
    });

    let rightArrow = createDiv("rightArrow");
    let rArrow = create("img");
    rArrow.src = "./images/right_Arrow.png";
    rightArrow.append(rArrow);

    rightArrow.addEventListener("click", function () {
      clearInterval(id);
    //   z++;
      slide(images,sliderDiv)
    });
    rightArrow.addEventListener("mouseleave", function () {
      if(id){
        clearInterval(id)
      }
    id = setInterval(function () {
        slide(images,sliderDiv)
       }, 1800);
    });

    imageDiv.append(
      addToFavorate,
      leftArrow,
      rightArrow,
      sliderDiv,
      newTitleDiv,
      onlineDiv
    );

    productInfo.append(imageDiv, priceDiv, name);
    maxFavourites.forEach((el) => {
      if (el.title == data[i].title) {
        addFavourites(addToFavorate);
      }
    });
    let disableDiv = createDiv("disableBox");
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
          changeImageColor(
            colorBtn,
            elementImage,
            this,
            sliderDiv,
            colorDownArray
          );
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

    disableDiv.append(productDetail, addBasketBtn);

    productDiv.append(productInfo, disableDiv);
  
    productDiv.addEventListener("mouseleave", function () {
      sliderStop(image, sliderDiv);
    });

    container.append(productDiv);
  });
};

let slide=(images,sliderDiv)=>{
    if (i === images.length) {
      i = 0;
    }
    let img = create("img");
    img.src = images[i];
    sliderDiv.append(img);

    sliderDiv.style.transition = "0.7s";
    sliderDiv.style.transform = `translateX(${z * -100}%)`;
    i++;
    z++;
}

function sliderStop(image, reset) {
  clearInterval(id);
  reset.innerHTML = null;

  let img = create("img");
  img.src = image;
  reset.append(img);
  reset.style.transform = "none";
  reset.style.transition = "";
}

// function sliderData(images, sliderDiv) {
//   sliderDiv.addEventListener("mouseenter", function () {
//     sliderData(images, sliderDiv);
//   });
// }

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
    maxFavourites = maxFavourites.filter((el) => {
      return el.id !== data[product].id;
    });
  } else {
    favor.style.backgroundColor = "pink";
    if (product) maxFavourites.push(data[product]);
  }
  // console.log(Favourites);
  localStorage.setItem("maxFavourites", JSON.stringify(maxFavourites));
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
