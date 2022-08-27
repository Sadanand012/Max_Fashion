import { navbar } from "../components/navbar.js";
import {footer_home} from "../components/footer.js";
import {offer_navbar} from "../components/offern_navbar.js";
document.getElementById("offer_s").innerHTML = offer_navbar()
document.getElementById("navbar").innerHTML = navbar()
document.getElementById("footer").innerHTML = footer_home()

let click_onwomen = document.querySelector(".category_btn5_1");
click_onwomen.addEventListener("click",function(){
    window.location.href = "homePage.html";
})