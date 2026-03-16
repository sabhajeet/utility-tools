const authContainer = document.getElementById("auth-container");
const notesContainer = document.getElementById("notes-container");
const authBtn = document.getElementById("auth-btn");
const toggleAuth = document.getElementById("toggle-auth");
const authTitle = document.getElementById("auth-title");
const nameInput = document.getElementById("name");
const logoutBtn = document.getElementById("logout-btn");

let isSignup = false;

// Check JWT
const token = localStorage.getItem("token");
if(token){
    showNotesSection();
    fetchNotes();
}

// Toggle Login/Signup
toggleAuth.addEventListener("click", ()=>{
    isSignup = !isSignup;
    nameInput.style.display = isSignup ? "block" : "none";
    authTitle.innerText = isSignup ? "Sign Up" : "Login";
    authBtn.innerText = isSignup ? "Sign Up" : "Login";
    toggleAuth.innerText = isSignup ? "Already have account? Login" : "Don't have an account? Sign Up";
});

// Auth Button
authBtn.addEventListener("click", async ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    try{
        const res = await fetch(`/api/auth/${isSignup ? "signup":"signin"}`,{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({email,password,name})
        });

        const data = await res.json();

        if(res.ok){
            localStorage.setItem("token", data.token);
            showNotesSection();
            fetchNotes();
        }else{
            alert(data.message || "Auth failed");
        }
    }catch(err){
        console.error(err);
    }
});

// Google login button
document.getElementById("google-login-btn").addEventListener("click", ()=>{
    // Open Google OAuth login
    window.location.href = "/api/auth/google"; // backend route for Google OAuth
});

// Logout
logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("token");
    notesContainer.style.display = "none";
    authContainer.style.display = "block";
});

// Show notes section
function showNotesSection(){
    authContainer.style.display = "none";
    notesContainer.style.display = "block";
}

// Fetch notes
async function fetchNotes(){
    const token = localStorage.getItem("token");
    const res = await fetch("/api/secure-notes",{
        headers:{ Authorization:`Bearer ${token}` }
    });
    const notes = await res.json();
    renderNotes(notes);
}

// Render notes
function renderNotes(notes){
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    notes.forEach(note=>{
        const div = document.createElement("div");
        div.classList.add("note-item");

        div.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.content}</p>
            <button onclick='editNote("${note._id}")'>Edit</button>
            <button onclick='deleteNote("${note._id}")'>Delete</button>
        `;
        notesList.appendChild(div);
    });
}

// Add note
document.getElementById("add-note-btn").addEventListener("click", async ()=>{
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;

    if(!title || !content) return alert("Title and content required");

    const token = localStorage.getItem("token");
    const res = await fetch("/api/secure-notes",{
        method:"POST",
        headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify({title,content})
    });
    const newNote = await res.json();
    fetchNotes();
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
});

// Delete note
async function deleteNote(id){
    const token = localStorage.getItem("token");
    await fetch(`/api/secure-notes/${id}`,{
        method:"DELETE",
        headers:{ Authorization:`Bearer ${token}` }
    });
    fetchNotes();
}

// Edit note
async function editNote(id){
    const token = localStorage.getItem("token");
    const newTitle = prompt("New title:");
    const newContent = prompt("New content:");

    if(newTitle && newContent){
        await fetch(`/api/secure-notes/${id}`,{
            method:"PUT",
            headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
            body: JSON.stringify({title:newTitle,content:newContent})
        });
        fetchNotes();
    }
}