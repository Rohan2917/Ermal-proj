const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");
const loginMessageMessage = document.getElementById('loginMessageMessage');

function validateLoginForm() {
  let emailValid = false;
  let passwordValid = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  loginMessageMessage.innerHTML = ""
  if (!emailRegex.test(email.value.trim())) {
    email.style.border = '2px solid red';
    loginMessageMessage.style.display = "block";
    loginMessageMessage.style.color = "let(--background-color)";
    loginMessageMessage.innerHTML = 'Please insert email';
  } else {
    emailValid = true;
    email.style.border = '1px solid rgb(221, 221, 221)';
  }

  if (password.value.trim() === '') {
    password.style.border = '2px solid red';
    loginMessageMessage.style.display = "block";
    loginMessageMessage.style.color = "let(--background-color)";
    loginMessageMessage.innerHTML = loginMessageMessage.innerHTML + "<br>" + "Please insert password"
  } else {
    passwordValid = true;
    password.style.border = '1px solid rgb(221, 221, 221)';
  }
  return emailValid && passwordValid;
}

document.getElementById("loginBtn")?.addEventListener("click", async function (e) {
  e.preventDefault();

  function displayErrorMessage(errorMessage) {
    loginMessageMessage.style.display = "block";
    loginMessageMessage.style.color = "let(--background-color)";
    loginMessageMessage.innerHTML = errorMessage;
  }

  if (validateLoginForm()) {
    let formData = {
      email: email.value,
      password: password.value,
    };
    try {
      let token = await login(formData);
      if (token) {
        console.log("Login successful. Redirecting to /accountProfile.html");
        window.location.href = "accountProfile.html";
      } else {
        displayErrorMessage('Wrong credentials!');
        console.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      displayErrorMessage(error.message || 'Wrong credentials!');
      console.error("Error logging in for user: ", email.value, "Error:", error);
    }
  }
});

document.getElementById("logoutBtn")?.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY);
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY);
  window.location.href = "index.html";
});

document.getElementById("updateAccountBtn")?.addEventListener("click", function (e) {
  e.preventDefault();

  // Collect values from form fields
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const displayName = document.getElementById("displayName").value;
  const email = document.getElementById("email").value;
  const currentPassword = document.getElementById("currentPassword").value || ""; // Assign "" if empty
  const newPassword = document.getElementById("newPassword").value || ""; // Assign "" if empty
  const confirmPassword = document.getElementById("confirmPassword").value || ""; // Assign "" if empty

  // Create JSON object
  const userFormData = {
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    email: email,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  //accountId take from sessionStorage
  //accesToken take from sessionStorage

  // Log the JSON object to the console (you can send it to the server or perform other actions)
  let updateUserInfoResp = updateAccount(userFormData);
  console.log(updateUserInfoResp);
});

function checkIfIsLoggedIn() {
  const loginLinksDiv = document.getElementById("loginLinksDiv")
  const accountProfileDropDown = document.getElementById("accountProfileDropDown")
  const accountData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY));
  const accountNameEl = document.getElementById("accountName")
  console.log("checkIfIsLoggedIn, accountData:", accountData);
  if (loginLinksDiv && accountProfileDropDown && accountNameEl) {
    let specificHref = 'library.html';
    let libraryRefs = document.querySelectorAll('[href="' + specificHref + '"]');
    if (accountData) {
      let accountName = getLoggedInAccountName()
      console.log("accountName", accountName)
      accountNameEl.innerText = accountName;
      loginLinksDiv.classList.add("d-none")
      accountProfileDropDown.classList.remove("d-none")
    } else {
      console.log("checkIfIsLoggedIn, user not logged in. Redirect to index page.");
      for (let i = 0; i < libraryRefs.length; i++) {
        libraryRefs[i].setAttribute('href', 'pricing.html');
      }
    }
  }
}

async function displaySiteInfoDiv() {
  let siteData = await getSiteData(siteId);
  document.getElementById("companyName").innerHTML = siteData.companyName;
  document.getElementById("companyNumber").innerHTML = siteData.companyNumber;
  document.getElementById("companyAddress").innerHTML = siteData.address;
  document.getElementById("siteEmail").innerHTML = siteData.email;
}

function displayUserInfoDiv() {
  const payments = document.getElementById("payments");
  const mySubscription = document.getElementById("mySubscription");
  const accountDetails = document.getElementById("accountDetails");
  const paymentsLink = document.getElementById("paymentsLink");
  const subscriptionLink = document.getElementById("subscriptionLink");
  const accountLink = document.getElementById("accountLink");
  paymentsLink?.addEventListener("click", () => {
    paymentsLink.querySelector("li").classList.add("active");
    subscriptionLink.querySelector("li").classList.remove("active");
    accountLink.querySelector("li").classList.remove("active");
    payments.classList.remove("d-none");
    mySubscription.classList.add("d-none");
    accountDetails.classList.add("d-none");
  });
  subscriptionLink?.addEventListener("click", () => {
    paymentsLink.querySelector("li").classList.remove("active");
    subscriptionLink.querySelector("li").classList.add("active");
    accountLink.querySelector("li").classList.remove("active");
    payments.classList.add("d-none");
    mySubscription.classList.remove("d-none");
    accountDetails.classList.add("d-none");
  });
  accountLink?.addEventListener("click", () => {
    paymentsLink.querySelector("li").classList.remove("active");
    subscriptionLink.querySelector("li").classList.remove("active");
    accountLink.querySelector("li").classList.add("active");
    payments.classList.add("d-none");
    mySubscription.classList.add("d-none");
    accountDetails.classList.remove("d-none");
  });
}

checkIfIsLoggedIn();
displaySiteInfoDiv();
displayUserInfoDiv();