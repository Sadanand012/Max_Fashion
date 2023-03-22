import { Display } from "./product.js";

let filterContainer =document.getElementById("filter_container");
export let sendData = (data) => {
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
let filterData={
  Price:{min,max},
  Size:diffrentSizes,
  Colors:diffrentColors,
  Tags:tags
}
 // console.log({ min, max }, diffrentSizes, diffrentColors, tags);
  filterFunctions(filterData);
};


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
// fucnction box--------------------------------------------------------------------------------------------------filtering
function filterFunctions(filterData) {
  filterContainer.innerHTML=""
  console.log(filterData);
  let filterBoxs = createDiv("filterBoxs");
 
  Object.keys(filterData).forEach(filter=>{
    let filterDiv = createDiv("filterDiv");
    let filterBtn = createDiv("filterBtn");

    let btnText = create("p", filter);
    let filterContent = createDiv("filterContent");
    let Arrow = create("img");
    Arrow.src = "./images/icons8-down-24.png";
    filterBtn.append(btnText, Arrow);
    let clk = true;
    filterBtn.addEventListener("click", function () {
      if (clk) {
        filterContent.style.display = "block";
        Arrow.src = "./images/icons8-up-24.png";
        filterBtn .style.border = "1px solid blue";
      } else {
        filterContent.style.display = "none";
        Arrow.src = "./images/icons8-down-24.png";
        filterBtn .style.border = "0.3px solid gray";
      }
      clk = !clk;
    });

    Object.keys(filterData[filter]).forEach(filterName=> {
      console.log(filter)
      let filterText = create("div","" );
      let input = create("input","" );
      input.type="checkbox";
      input.value=filterName
      let text = create("p",filterName);
      let quan = create("p", "(" + filterData[filter][filterName] + ")");
      filterText.append(input,text,quan);
      filterContent.append(filterText);
      filterText.addEventListener("click", function () {
        console.log(this.innerText);
      
        // let filterData = data.filter((el) => {
        //   let flag = false;
        //   el[filter].forEach((ele) => {
        //     if (ele == text) {
        //       flag = true;
        //     }
        //   });
        //  if (flag) return el;
        });
      //  Display(filterData);
    
      });
      filterDiv.append(filterBtn, filterContent);
      filterBoxs.append( filterDiv)
    })
    
   
  
  filterContainer.append(filterBoxs)
  }
//   let extraFuncDiv = create("div");
//   extraFuncDiv.id = "extraFuncDiv";
//   console.log(1);
//   if (Object.keys(tags).length !== 0) {
//     let sizeFuncBtn = createDiv("sizeFuncBtn");

//     let sz = create("p", "Browse");
//     let sizeFuncRes = createDiv("sizeFuncRes");
//     let Arrow = create("img");
//     Arrow.src = "./images/icons8-down-24.png";
//     sizeFuncBtn.append(sz, Arrow);
//     let clk = true;
//     sizeFuncBtn.addEventListener("click", function () {
//       if (clk) {
//         sizeFuncRes.style.display = "block";
//         Arrow.src = "./images/icons8-up-24.png";
//         sizeFuncDiv.style.border = "1px solid blue";
//       } else {
//         sizeFuncRes.style.display = "none";
//         Arrow.src = "./images/icons8-down-24.png";
//         sizeFuncDiv.style.border = "0.3px solid gray";
//       }
//       clk = !clk;
//     });

//     for (let i in tags) {
//       let size = create("p", i);
//       let quan = create("span", "(" + tags[i] + ")");
//       if (size.innerText != "") {
//         size.append(quan);
//       }

//       size.addEventListener("click", function () {
//         console.log(this.innerText);
//         let findSize = this.innerText;
//         let bag = "";
//         for (let i = 0; i < findSize.length; i++) {
//           if (findSize[i] == "(") break;
//           bag += findSize[i];
//         }
//         let filterData = data.filter((el) => {
//           let flag = false;
//           el.extraInfo.forEach((ele) => {
//             if (ele == bag) {
//               flag = true;
//             }
//           });
//           el.new.forEach((ele) => {
//             if (ele == bag) {
//               flag = true;
//             }
//           });
//           if (flag) return el;
//         });
//         Display(filterData);
//         sizeFuncRes.style.display = "none";
//         Arrow.src = "./images/icons8-down-24.png";
//         sizeFuncDiv.style.border = "0.3px solid gray";
//       });
//       sizeFuncRes.append(size);
//     }
//     console.log(sizeFuncRes);
//     extraFuncDiv.innerHTML = null;
//     extraFuncDiv.append(sizeFuncBtn, sizeFuncRes);
//   }

//   console.log(1);
//   let colourFuncDiv = create("div");
//   colourFuncDiv.id = "colourFuncDiv";
//   if (Object.keys(diffrentColors).length !== 0) {
//     let colorFuncBtn = createDiv("colorFuncBtn");

//     let col = create("p", "Color");
//     let colorFuncRes = createDiv("colorFuncRes");
//     let Arrow = create("img");
//     Arrow.src = "./images/icons8-down-24.png";
//     colorFuncBtn.append(col, Arrow);
//     let clk = true;
//     colorFuncBtn.addEventListener("click", function () {
//       if (clk) {
//         colorFuncRes.style.display = "block";
//         Arrow.src = "./images/icons8-up-24.png";
//         colourFuncDiv.style.border = "1px solid blue";
//       } else {
//         colorFuncRes.style.display = "none";
//         Arrow.src = "./images/icons8-down-24.png";
//         colourFuncDiv.style.border = "0.3px solid gray";
//       }
//       clk = !clk;
//     });

//     for (let i in diffrentColors) {
//       let color = create("p", i);
//       let quan = create("span", "(" + diffrentColors[i] + ")");
//       color.append(quan);

//       color.addEventListener("click", function () {
//         console.log(this.innerText);
//         let findColor = this.innerText;
//         let bag = "";
//         for (let i = 0; i < findColor.length; i++) {
//           if (findColor[i] == "(") break;
//           bag += findColor[i];
//         }
//         let filterData = data.filter((el) => {
//           let flag = false;
//           el.color.forEach((ele) => {
//             if (ele == bag) {
//               flag = true;
//               fetch;
//             }
//           });
//           if (flag) return el;
//         });
//         //  Display(filterData);
//         colorFuncRes.style.display = "none";
//         Arrow.src = "./images/icons8-down-24.png";
//         colourFuncDiv.style.border = "0.3px solid gray";
//       });
//       colorFuncRes.append(color);
//     }
//     console.log(colorFuncRes);

//     colourFuncDiv.append(colorFuncBtn, colorFuncRes);
//     operationFuncDiv.innerHTML = null;
//     operationFuncDiv.append(sizeFuncDiv, colourFuncDiv, extraFuncDiv);
//   }



