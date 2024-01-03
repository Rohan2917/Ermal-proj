// Function to retrieve payment3DResp from sessionStorage
function getPayment3DRespFromSessionStorage() {
  const payment3DRespString = sessionStorage.getItem("payment3DResp");

  // Check if payment3DRespString is not null or undefined
  if (payment3DRespString) {
    return JSON.parse(payment3DRespString);
  } else {
    // If payment3DRespString is null or undefined, return null (or handle it as needed)
    return null;
  }
}

// Call the function when the page is loaded
window.addEventListener("load", async function () {
  console.log("Script loaded");

       // Get the URL parameters
       const urlParams = new URLSearchParams(window.location.search);
       const id = urlParams.get('id');
       const resourcePath = urlParams.get('resourcePath');

       // Update the content of the divs
       document.getElementById('subscriptionConfirmId').textContent += id;
       document.getElementById('subscriptionConfirmResourcePathDiv').textContent += resourcePath;

  const storedPayment3DResp = getPayment3DRespFromSessionStorage();

  // Use the storedPayment3DResp as needed
  console.log("Stored payment3DResp:", storedPayment3DResp);

  let transactionId = storedPayment3DResp.tpResponse.id;
  console.log("transactionId", transactionId);
  const payment3DConfirmResp = await sendPayment3DResponse(
    { paymentId: storedPayment3DResp._id },
    transactionId
  );
  console.log("payment3DConfirmResp", payment3DConfirmResp);


  sessionStorage.removeItem("payment3DResp");
});
