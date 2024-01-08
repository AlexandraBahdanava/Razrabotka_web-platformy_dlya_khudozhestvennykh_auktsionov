import host from ".";

const getRateByAuction = async (id) => {
    try {
        const response = await host.get(`/api/rates/${id}`); 

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

export { getRateByAuction};