const getBooks = async () => {
    const resourceUrl = `${BACKEND_URL}/${siteId}/books/subscription`;
    let token = getTokenFromStorage();
    try {
      const response = await fetch(resourceUrl, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not OK ${resourceUrl}`);
      }
      const data = await response.json();
      console.log('Response from backend:', data);
      return data
    } catch (error) {
      console.error(`Error while calling backend on ${resourceUrl}. Error:`, error.message);
      throw error; // Re-throw the original error
    }
};

