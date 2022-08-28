

// let data=JSON.parse(localStorage.getItem("payment")) || [];


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