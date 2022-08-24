let imagesLink = [
    "./components/Screenshot (150).png",
    "./components/Screenshot (151).png",
    "./components/Screenshot (152).png",
    "./components/Screenshot (153).png",
  ]
  let leftbtn = document.getElementById("left-btn");
  let rightbtn = document.getElementById("right-btn");
  let crauser = document.getElementById("crauser");
  let imageState = 0;
  rightbtn.addEventListener("click", function () {
    imageState++;
    if (imageState === imagesLink.length) {
      imageState = 0;
    }
    crauser.src = imagesLink[imageState];
  })
  leftbtn.addEventListener("click", function () {
    imageState--;
    if (imageState < 0) {
      imageState = imagesLink.length - 1;
    }
    crauser.src = imagesLink[imageState];
  })