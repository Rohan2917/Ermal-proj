const getSiteData = async (siteId) => {
  const resourceUrl = `${BACKEND_URL}/${siteId}/companyData`;
  try {
    const response = await fetch(resourceUrl, {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error(`Network response was not OK ${resourceUrl}`);
    }
    const data = await response.json();
    // console.log('Company Data from backend:', data);
    return data;
  } catch (error) {
    console.error(`Error while calling backend on ${resourceUrl}. Error:`, error.message);
    throw error; // Re-throw the original error
  }
};
