const login = async (payload) => {
  const resourceUrl = `${BACKEND_URL}/${siteId}/account/login`;
  let response;
  try {
    console.log("login data: ", payload);
    response = await fetch(resourceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("login Response from backend:", response);
  } catch (error) {
    console.error(`Error while calling backend on ${resourceUrl}. Error: ${error.message}`);
    throw new Error(`Error while calling backend on ${resourceUrl}`);
  }

  if (response?.ok) {
    const data = await response.json();
    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY, JSON.stringify(data));
    return data.token
  } else {
    const error = await response.json();
    console.log("Response NOT ok: ", error.message);
    localStorage.setItem("errorData", JSON.stringify(error));  // Save error data if needed
    throw new Error(error.message || "Wrong Credentials!");
  }
};

const getAccountInfo = async () => {
  const resourceUrl = `${BACKEND_URL}/${siteId}/account/profile`;
  let token = getTokenFromStorage();
  let response;
  try {
    response = await fetch(resourceUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      console.log("getAccountInfo was not ok. Setting accountInfo in localStorage to null");
      localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY);
      throw new Error(`Network response was not OK. Status: ${response.status}, statusText: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log("getAccountInfo Response from backend:", data);
    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error while getting useraccount", error);
    // throw new Error("Network response was not ok " + `${resourceUrl}`);
    throw error;
  }
};

const cancelSubscription = async (subscriptionId) => {
  const resourceUrl = `${BACKEND_URL}/${siteId}/subscription/${subscriptionId}`;
  let token = getTokenFromStorage();
  let response;
  try {
    response = await fetch(resourceUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not OK " + `${resourceUrl}`);
    }

    const data = await response.json();
    console.log("deleteAccount Response from backend:", data);

    // Optionally, clear any locally stored data related to the account after deletion
    localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY);

    return data;
  } catch (error) {
    console.error(`Error while calling backend on ${resourceUrl}. Error: ${error.message}`);
    throw new Error("Network response was not ok " + `${resourceUrl}`);
  }
};

const updateAccount = async (payload) => {
  let accountId= getAccountLoginFromStorage().accountId
  const resourceUrl = `${BACKEND_URL}/${siteId}/account/${accountId}`;
  let token = getTokenFromStorage();
  let response;
  try {
    response = await fetch(resourceUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Network response was not OK " + `${resourceUrl}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error while calling backend on ${resourceUrl}. Error: ${error.message}`);
    throw new Error("Network response was not ok " + `${resourceUrl}`);
  }
};

const getAccountLoginFromStorage = () => {
  let accountLogin = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY);
  // console.log("stored accountData: ", accountData);
  accountLogin = JSON.parse(accountLogin);
  return accountLogin;
}

const getTokenFromStorage = () => {
  let accountLogin = getAccountLoginFromStorage();
  return accountLogin?.token;
}

const getLoggedInAccountName = () => {
  let accountProfile = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY);
  accountProfile = JSON.parse(accountProfile);
  return accountProfile?.accountDetails?.firstName + " " + accountProfile?.accountDetails?.lastName;
}