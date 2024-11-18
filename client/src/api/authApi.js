import host from ".";

const login = async (loginData) => {
    try {
        const response = await host.post("/auth/login", loginData);
        return response;
    } catch (error) {
        handleRequestError(error);
    }
};

const checkEmail = async (email) => {
    try {
        const response = await host.post("/auth/register/checkEmail", { email });
        return response;
    } catch (error) {
        handleRequestError(error);
    }
};

const checkLogin = async (login) => {
    try {
        const response = await host.post("/auth/register/checkLogin", { login });
        return response;
    } catch (error) {
        handleRequestError(error);
    }
};

const registerArtist = async (artistData) => {
    try {
        const response = await host.post("/auth/register/artist", artistData);
        return response;
    } catch (error) {
        handleRequestError(error);
    }
};

const registerCollector = async (collectorData) => {
    try {
        const response = await host.post("/auth/register/collector", collectorData);
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

export { login, checkEmail, checkLogin, registerArtist, registerCollector };
