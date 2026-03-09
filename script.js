const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let issuesData = [];

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "main.html";
  } else {
    alert("Wrong credentials");
  }
}
// LOAD ISSUES
async function loadIssues() {
  const loader = document.getElementById("loader");

  loader.classList.remove("hidden");

  const res = await fetch(API);
  const data = await res.json();

  issuesData = data.data;

  displayIssues(issuesData);

  loader.classList.add("hidden");
}
