import { navbar } from "../components/navbar.js";
import { footer_home } from "../components/footer.js";
document.getElementById("navbar").innerHTML = navbar()
document.getElementById("footer").innerHTML = footer_home()


document.getElementById("myForm").addEventListener("submit", myFun);
	let  data = JSON.parse(localStorage.getItem("Signup")) || [];
	function myFun(event) {
		event.preventDefault();
		var obj = {
			name: document.getElementById("fname").value,
			lname: document.getElementById("lname").value,
			email: document.getElementById("email").value,
			uName: document.getElementById("userName").value,
			password: document.getElementById("password").value,
		};
        if(document.getElementById("fname").value==""||document.getElementById("lname").value=="" || document.getElementById("email").value==""||document.getElementById("userName").value=="" ||document.getElementById("password").value=="")
        {
                alert("Fill all the fields")
        }
        else{
            data.push(obj);
        console.log(obj);
		localStorage.setItem("Signup", JSON.stringify(data));
		alert("Account Created");
		window.location.href = "Login.html";
        }
		
	}

