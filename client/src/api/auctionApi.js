import host from ".";

const createAuction = async (auctionData) => {
    try {
        const response = await host.post("/api/auctions", auctionData);
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

export { createAuction };