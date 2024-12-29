import host from ".";

const getRateByAuction = async (id) => {
    try {
        const response = await host.get(`/auth/rates/${id}`); 
        return response;
    } catch (error) {
        handleRequestError(error);
    }
};

const createRate = async (rateData) => {
    try {
      const response = await host.post("/api/rate/create", rateData);
      return response.data;
    } catch (error) {
        handleRequestError(error);
    }
  };

const handleRequestError = (error) => {
    if (error.response) {
        return error.response;
    } else if (error.request) {
        console.log("Server did not respond.");
    } else {
        console.log("Error while creating request");
    }
};

export { getRateByAuction, createRate};