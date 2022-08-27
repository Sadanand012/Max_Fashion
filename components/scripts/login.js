document.getElementById("login").addEventListener("submit", MyFun);
	function MyFun(event) {
		event.preventDefault();
		let eml = document.querySelector("#email").value;
		let psw = document.querySelector("#password").value;
		console.log(eml);
		console.log(psw);

		let user_records = JSON.parse(localStorage.getItem("Signup"));
		
		if (
			user_records.some((v) => {
				return v.email == eml && v.password == psw;
			})
		) {
			alert("Login Success");
			let current_user = user_records.filter((v) => {
				return v.email == eml && v.password == psw;
			})[0];
			localStorage.setItem("name", current_user.name);
			window.location.href = "main1.html";
		} else {
			alert("Login Failed");
		}
	}
	console.log("hello")