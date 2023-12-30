import host from ".";

const login = async (loginData) => {
    try {
        const response = await host.post("/auth/login", loginData);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const checkEmail = async (email) => {
    try {
        const response = await host.post("/auth/register", { email });
        console.log("Server response:", response);
        return response;
    } catch (error) {
        console.error("Error during checkEmail:", error);
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }

};

const registerArtist = async (artistData) => {
    try {
        const response = await host.post("/auth/register/artist", artistData);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const registerCollector = async (collectorData) => {
    try {
        const response = await host.post("/auth/register/collector", collectorData);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { login, checkEmail, registerArtist, registerCollector };