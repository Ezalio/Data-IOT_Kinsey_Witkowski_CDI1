///// SIDE NAV //////
// Fonction pour ouvrir la barre latérale
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

// Fonction pour fermer la barre latérale
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

document.addEventListener("DOMContentLoaded", function () {
  const topbarBtn = document.querySelector(".floating-btn");
  const modal = document.querySelector(".modal");

  // Fonction pour ouvrir la modale
  function openModal() {
    modal.style.display = "block";
  }

  // Fonction pour fermer la modale
  function closeModal() {
    modal.style.display = "none";
  }

  // Ouvrir la modale lors du clic sur le bouton flottant
  topbarBtn.addEventListener("click", openModal);

  // Fermer la modale lors du clic sur le bouton de fermeture
  const closeModalBtn = document.querySelector(".close");
  closeModalBtn.addEventListener("click", closeModal);

  // Fermer la modale lors du clic en dehors de celle-ci
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Ouvrir la modale lors du clic sur le lien "trade" dans l'en-tête
  const tradeLink = document.querySelector("#trade-link");
  tradeLink.addEventListener("click", openModal);
});

// Existing side-nav functionality...

// New functionality to adjust navigation based on user login status
document.addEventListener("DOMContentLoaded", function () {
  adjustNavForUserStatus();
});

function adjustNavForUserStatus() {
  const token = localStorage.getItem("token");
  const loginLink = document.querySelector("a[href='login.html']"); // Assuming the login link is always present

  if (token) {
    // If logged in, change the Login link to Profile
    loginLink.textContent = "Profile";
    loginLink.href = "profile.html";

    // Optionally, add a logout button or link if you don't already have one
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.onclick = function () {
      localStorage.removeItem("token");
      window.location.href = "index.html"; // Redirect to home or login page
    };
    const sidebar = document.getElementById("mySidebar");
    sidebar.appendChild(logoutLink); // Append logout link to the sidebar
  } else {
    // If not logged in, ensure the link says "Login"
    loginLink.textContent = "Login";
    loginLink.href = "login.html";
  }
}
