let searchTitle = document.getElementById("searchTitle");
let container = document.getElementById("container");

let maxCart = JSON.parse(localStorage.getItem("maxCart")) || [];
let Favourites = JSON.parse(localStorage.getItem("FavouriteProducts")) || [];

async function getData() {
  let search = "Soft Toys";
  let query = "womenKurta";
  searchTitle.innerText = search;

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
    Display(data);
  } catch (err) {
    console.log(err.message);
  }
}
getData();

function create(element, text = "") {
  let ele = document.createElement(element);
  ele.innerText = text;

  return ele;
}
function createDiv(classname = "") {
  let el = document.createElement("div");
  el.className = classname;
  return el;
}

let Display = (data) => {
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
      // addFavourites(this, data, i);
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
    leftArrow.addEventListener("click", function () {
      // div1.style.transform = "translateX(-100%)";
    });

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
        // addFavourites(addToFavorate);
      }
    });
    container.append(div);
  });
};
