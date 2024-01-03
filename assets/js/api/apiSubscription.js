const sendPaymentClassic = async (payload) => {
  const resourceUrl = `${BACKEND_URL}/${siteId}/subscription/payWithCreditCard`;
  console.log("formData", payload);
  try {
      const response = await fetch(resourceUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error(`Network response was not OK ${resourceUrl}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      return data;
  } catch (error) {
      console.error(`Error while calling backend on ${resourceUrl}. Error:`, error.message);
      throw error; // Re-throw the original error
  }
};

const sendPayment3D = async (payload) => {
    const resourceUrl = `${BACKEND_URL}/${siteId}/subscription/payWithCreditCardSecure3D`;
    console.log("formData", payload);
    try {
        const response = await fetch(resourceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
            throw new Error(`Network response was not OK ${resourceUrl}`);
        }
  
        const data = await response.json();
        console.log('Response from backend:', data);
        return data;
    } catch (error) {
        console.error(`Error while calling backend on ${resourceUrl}. Error:`, error.message);
        throw error; // Re-throw the original error
    }
  };

  const sendPayment3DResponse = async (payload3DResponse,transactionId) => {
    const resourceUrl = `${BACKEND_URL}/${siteId}/subscription/payWithCreditCardSecure3D/response/${transactionId}`;
    console.log(`sendPayment3DResponse url: ${resourceUrl}, payload: ${JSON.stringify(payload3DResponse)}`);
    try {
        const response = await fetch(resourceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload3DResponse),
        });
  
        if (!response.ok) {
            throw new Error(`Network response was not OK ${resourceUrl}`);
        }
  
        const data = await response.json();
        console.log('Response from backend:', data);
        return data;
    } catch (error) {
        console.error(`Error while calling backend on ${resourceUrl}. Error:`, error.message);
        throw error; // Re-throw the original error
    }
  };
