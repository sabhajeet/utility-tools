// public/js/login.js
document.getElementById("login-btn").addEventListener("click", async ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    try{
        const res = await fetch("http://localhost:3001/api/auth/signin", {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ email,password })
        });

        const data = await res.json();
        if(res.ok){
            msg.innerText = "Login successful!";
            window.location.href = "/tools/secure-notes.html";
        }else{
            msg.innerText = data.message;
        }
    }catch(err){
        console.error(err);
        msg.innerText = "Server error";
    }
});