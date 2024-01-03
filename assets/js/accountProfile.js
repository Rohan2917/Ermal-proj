let accountProfile = {};

document.getElementById("actionsCellButton")?.addEventListener("click", async function (e) {
  const userConfirmed = window.confirm("Are you sure you want to cancel your subscription?");
  if (userConfirmed) {
    let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY));
    let subscriptionId = storedData.subscriptionId;
    console.log("User cancelled subscriptionId", subscriptionId);
    let cancelSubscriptionResp = await cancelSubscription(subscriptionId);
    localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY);
    window.location.href = "index.html";
  } else {
    console.log("Subscription cancellation canceled by user.");  // User canceled the action
  }
});

document.getElementById("saveChangesSubmit")?.addEventListener("click", async function (e) {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const displayName = document.getElementById("displayName").value;
  const email = document.getElementById("email").value;
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY));
  let accountId = storedData.accountId

  let updateProfileInfoPayload = {
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    email: email,
  };
  if (currentPassword.trim() !== "") {
    updateProfileInfoPayload.currentPassword = currentPassword;
  }
  if (newPassword.trim() !== "") {
    updateProfileInfoPayload.password = newPassword;
  }
  if (confirmPassword.trim() !== "") {
    updateProfileInfoPayload.confirmPassword = confirmPassword;
  }
  let updateAccountResp = await updateAccount(updateProfileInfoPayload, accountId)
  console.log("updateAccountResp", updateAccountResp)
});

async function loadAccountProfile() {
  try {
    accountProfile = await getAccountInfo();
    console.log("loadAccountProfile: ", accountProfile)
    
    function createPaymentRow(payment) {
      const tr = document.createElement("tr");
  
      const tdPayments = document.createElement("td");
      tdPayments.textContent = payment.id; // Assuming payment ID corresponds to "Payments"
      tdPayments.classList.add("ea-primary-color");
      tr.appendChild(tdPayments);
  
      const tdDate = document.createElement("td");
      tdDate.textContent = getDate(payment.date);
      tr.appendChild(tdDate);
  
      const tdStatus = document.createElement("td");
      tdStatus.textContent = payment.status;
      tr.appendChild(tdStatus);
  
      const tdTotal = document.createElement("td");
      tdTotal.textContent = payment.amount;
      tr.appendChild(tdTotal);
  
      // const tdAction = document.createElement("td");
      // const viewButton = document.createElement("button");
      // viewButton.className = "btn";
      // viewButton.textContent = "View";
      // const viewLink = document.createElement("a");
      // viewLink.href = "#";
      // viewLink.appendChild(viewButton);
      // tdAction.appendChild(viewLink);
      // tr.appendChild(tdAction);
      return tr;
    }
  
    // Get the table body element
    const tableBody = document.getElementById("paymentsTableBody");
    // Iterate through payments and create table rows
    accountProfile.payments.forEach((payment) => {
      const paymentRow = createPaymentRow(payment);
      tableBody.appendChild(paymentRow);
    });
  
    // Function to populate HTML tables with subscription values
    function populateTables() {
      // Populate subscription table
      document.getElementById("statusCell").textContent = accountProfile.subscription.status;
      document.getElementById("startDateCell").textContent = getDate(accountProfile.subscription["Start date"]);
      document.getElementById("nextPaymentDateCell").textContent = getDate(accountProfile.subscription["Next Payment date"]);
      // document.getElementById("paymentCell").textContent = accountProfile.subscription.Payment;
  
      // Populate totals table
      document.getElementById("productName").textContent = accountProfile.subscription.Plan;
      document.getElementById("productTotal").textContent = accountProfile.subscription.planPrice;
      document.getElementById("subTotal").textContent = accountProfile.subscription.SubTotal;
      document.getElementById("total").textContent = accountProfile.subscription.Total;
    }

    function getDate(date) {
      try {
        date = date.split('T')[0];
      } catch (err) {
        console.log("Error parsing date", err)
      }
      return date
    }
  
    function updateBillingAddress(accountProfile) {
      const billingAddressTable = document.getElementById("billingAddress");
      // Update the address components dynamically
      billingAddressTable.querySelector("#address").textContent = accountProfile.billingAddress.address || "N/A";
      billingAddressTable.querySelector("#city").textContent = accountProfile.billingAddress.city || "N/A";
      billingAddressTable.querySelector("#country").textContent = accountProfile.billingAddress.country || "N/A";
      billingAddressTable.querySelector("#state").textContent = accountProfile.billingAddress.state || "N/A";
      // Update the email dynamically
      billingAddressTable.querySelector("#emailValue").textContent = accountProfile.billingAddress.email || "N/A";
    }
  
    function setInitialValues() {
      // Example: Set initial values for input fields
      document.getElementById("firstName").value = accountProfile.accountDetails.firstName;
      document.getElementById("lastName").value = accountProfile.accountDetails.lastName;
      document.getElementById("displayName").value = accountProfile.accountDetails.displayName;
      document.getElementById("email").value = accountProfile.accountDetails.email;
    }
  
    updateBillingAddress(accountProfile);
    populateTables();
    setInitialValues();
    checkIfIsLoggedIn(); //in main file
  } catch (err) {
    console.error("Error in loadAccountProfile", err);
    redirectToHomeIfNotLoggedIn();
  }
}

loadAccountProfile();

redirectToHomeIfNotLoggedIn();

function redirectToHomeIfNotLoggedIn() {
  let token = getTokenFromStorage();
  if (!token) {
    window.location.href = 'login.html'; // Token is missing, redirect to the login page
  }
}
