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
// DISPLAY ISSUES
function displayIssues(issues) {
  const container = document.getElementById("issuesContainer");
  const count = document.getElementById("issueCount");

  container.innerHTML = "";
  count.innerText = issues.length + " Issues";

  issues.forEach((issue) => {
    const border =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    // LABEL DESIGN
    let labelsHTML = "";

    if (issue.labels && issue.labels.includes("bug")) {
      labelsHTML += `
      <span class="flex items-center gap-1 text-red-500 border border-red-300 px-3 py-1 rounded-full text-xs">
        <img src="./assets/bug.png" alt="" class="w-4" /> BUG
      </span>
      `;
    }

    if (issue.labels && issue.labels.includes("help wanted")) {
      labelsHTML += `
      <span class="flex items-center gap-1 text-green-800 border border-yellow-400 px-3 py-1 rounded-full text-xs">
        <img src="./assets/Open-Status.png" alt="" class="w-3" /> HELP WANTED
      </span>
      `;
    }
    if (issue.labels && issue.labels.includes("enhancement")) {
      labelsHTML += `
      <span class="flex items-center gap-1 text-red-500 border border-red-300 px-3 py-1 rounded-full text-xs">
        <img src="./assets/enhance.png" alt="" class="w-3" />Enhancement
      </span>
      `;
    }
    if (issue.labels && issue.labels.includes("good first issue")) {
      labelsHTML += `
      <span class="flex items-center gap-1 text-green-500 border border-red-300 px-3 py-1 rounded-full text-xs">
        <img src="./assets/good issues.png" alt="" class="w-3" /> Good Issue
      </span>
      `;
    }
    if (issue.labels && issue.labels.includes("documentation")) {
      labelsHTML += `
      <span class="flex items-center gap-1 text-black border border-red-300 px-3 py-1 rounded-full text-xs">
        <img src="./assets/documention.png" alt="" class="w-3" /> documentation
      </span>
      `;
    }
    // STATUS ICON
    let statusIconHTML =
      issue.status === "open"
        ? `<div class="rounded-full border border-[#22C55E] p-1">
            <img src="./assets/Open-Status.png" alt="" class="w-4" />
           </div>`
        : `<div class="rounded-full border border-[#A855F7] p-1">
            <img src="./assets/Closed- Status .png" alt="" class="w-4" />
           </div>`;

    const card = document.createElement("div");

    const date = new Date(issue.createdAt);
    const formattedDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    card.className = `bg-white p-5 rounded-xl shadow border-t-4 ${border} cursor-pointer hover:shadow-lg transition`;

    card.innerHTML = `
    
    <div class="flex justify-between items-center mb-3">

        <span>${statusIconHTML}</span>

        <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold">
        ${issue.priority}
        </span>

    </div>

    <h3 class="font-semibold text-lg">
    ${issue.title}
    </h3>

    <p class="text-sm text-gray-500 mt-2">
    ${issue.description}
    </p>

    <div class="flex gap-2 mt-3 flex-wrap">
    ${labelsHTML}
    </div>

    <hr class="my-3">

    <p class="text-xs text-gray-500">
    #${issue.id} by ${issue.author}
    </p>

    <p class="text-xs text-gray-400">
    
    ${formattedDate}
    </p>
    `;

    card.onclick = () => openModal(issue.id);

    container.appendChild(card);
  });
}
// FILTER ISSUES
function filterIssues(status) {
  if (status === "all") {
    displayIssues(issuesData);
  } else {
    const filtered = issuesData.filter((i) => i.status === status);
    displayIssues(filtered);
  }
}
// SEARCH ISSUE
async function searchIssue() {
  const text = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );

  const data = await res.json();

  displayIssues(data.data);
}
// OPEN MODAL
async function openModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );

  const data = await res.json();

  const issue = data.data;

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDescription").innerText = issue.description;
  document.getElementById("modalStatus").innerText = issue.status;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalPriority").innerText = issue.priority;
  document.getElementById("modalLabel").innerText = issue.labels;
  document.getElementById("modalCreated").innerText = issue.createdAt;

  document.getElementById("issueModal").showModal();
}

// LOAD WHEN PAGE OPEN
if (document.getElementById("issuesContainer")) {
  loadIssues();
}
