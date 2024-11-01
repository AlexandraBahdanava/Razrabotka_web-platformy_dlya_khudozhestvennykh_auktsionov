import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublicHeader from "../components/headers/PublicHeader";
import ArtistHeader from "../components/headers/ArtistHeader";
import CollectorHeader from "../components/headers/CollectorHeader";
import Footer from "../components/Footer";

const HomePage = () => {
    const [role, setRole] = useState(localStorage.getItem("role"));

    useEffect(() => {
        const handleRoleChange = () => {
            setRole(localStorage.getItem("role"));
        };

        window.addEventListener("storage", handleRoleChange);
        return () => window.removeEventListener("storage", handleRoleChange);
    }, []);

    const renderHeader = () => {
        if (!role) {
            return <PublicHeader />;
        } else if (role === "artist") {
            return <ArtistHeader />;
        } else if (role === "collector") {
            return <CollectorHeader />;
        }
        return <PublicHeader />;
    };

    return (
        <>
            <Grid container style={{ width: "100%", height: "100%" }}>
                {renderHeader()}
                <Grid container flexDirection="column" alignItems="center">
                    {/* Место для основного контента */}
                </Grid>
                <Footer />
            </Grid>
        </>
    );
};

export default HomePage;
