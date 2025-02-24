import host from ".";

const createAuction = async (auctionData) => {
  try {
    const response = await host.post("/api/auctions", auctionData);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const getAuctionsByArtist = async (id) => {
  try {
    const response = await host.get(`/api/auctions/${id}`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const getAuction = async (id) => {
  try {
    const response = await host.get(`/auth/auction/one/${id}`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const getAuctionsByCollector = async (id) => {
  try {
    const response = await host.get(`/api/auctions/active/${id}`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

const getAuctions = async () => {
  try {
    const response = await host.get("/auth/auctions/all");
    return response;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
};

const searchByMaterial = async (material) => {
  try {
    const response = await host.get(`/api/auctions/material`, material);
    return response;
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

export {
  createAuction,
  getAuctionsByArtist,
  searchByMaterial,
  getAuctions,
  getAuctionsByCollector,
  getAuction,
};
