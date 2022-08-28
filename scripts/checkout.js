import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
import { offer_navbar } from "../components/offern_navbar.js";
document.getElementById("offer_s").innerHTML = offer_navbar()
document.getElementById("navbar").innerHTML = navbar()
//document.getElementById("footer").innerHTML = footer_home()

let maxCart=[{price:300},
{price:100},
{price:100},
]
localStorage.setItem("maxCart",JSON.stringify(maxCart));
let data=JSON.parse(localStorage.getItem("maxCart")) || [];


let form = document.getElementById("form");
form.addEventListener("submit",paymentDetails)

function paymentDetails(event){
    event.preventDefault();
    let data=[];
    
    console.log("inside fun")

    let name=document.getElementById("name").value;
    let cardn=document.getElementById("cardn").value;
    let address=document.getElementById("add").value;
    let month=document.getElementById("month").value;
    let year=document.getElementById("year").value;
    let cname=document.getElementById("cname").value;
    let city=document.getElementById("city").value;
    let postcode=document.getElementById("pcode").value;
    let cvv=document.getElementById("cvv").value;

    let obj = new Account (name,cardn,month,year,cvv,city,postcode,cname,address)
    data.push(obj);

    // localStorage.setItem("payment",JSON.stringify(data));
    if(name=="" || cardn=="" || month=="" || year=="" || city=="" || postcode=="" || cvv==""){
        alert("Please fill all the required details")
    }
    else{
        alert("Your payment is done")
        window.location.href="../homePage.html";
    }
}

function Account(n,cn,m,y,c,ct,pc,con,a){
    this.name=n;
    this.cardn=cn;
    this.month=m;
    this.year=y;
    this.cvv=c;
    this.city=ct;
    this.postcode=pc;
    this.cname=con;
    this.address=a;
}

let calculation=()=>{
    let total=0;
    data.forEach(e=> {
       total=total+e.price;
    });
    console.log(total);
    document.getElementById("individual").innerText=`₹${total}`;
    document.getElementById("subtotal").innerText=`₹${total}`;
    document.getElementById("toatlDue").innerText=`₹${total}`;

}
calculation();