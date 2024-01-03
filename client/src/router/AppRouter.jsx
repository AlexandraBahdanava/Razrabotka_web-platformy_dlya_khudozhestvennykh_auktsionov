import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { artistRoutes } from "./artistRoutes";
import { collectorRoutes } from "./collectorRoutes";
import { COMPANY_PROFILE_ROUTE, LOGIN_ROUTE, USER_PROFILE_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setJwt(localStorage.getItem("jwt"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    if (jwt && localStorage.getItem("role") === "artist") {
        return (
            <Routes>
                {artistRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={ARTIST_PROFILE_ROUTE} />} />
            </Routes>
        );
    }

    if (jwt && localStorage.getItem("role") === "collector") {
        return (
            <Routes>
                {collectorRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={COLLECTOR_PROFILE_ROUTE} />} />
            </Routes>
        );
    }

    if (!jwt) {
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
    }
};

export default AppRouter;