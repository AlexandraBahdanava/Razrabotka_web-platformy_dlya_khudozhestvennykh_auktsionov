import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { artistRoutes } from "./artistRoutes";
import { collectorRouter } from "./collectorRouter";


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
                <Route key="*" path="*" element={<Navigate to="/artists" />} />
            </Routes>
        );
    }

    if (jwt && localStorage.getItem("role") === "collector") {
        return (
            <Routes>
                {collectorRouter.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to="/collectors" />} />
            </Routes>
        );
    }

    if (!jwt) {
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
};

export default AppRouter;