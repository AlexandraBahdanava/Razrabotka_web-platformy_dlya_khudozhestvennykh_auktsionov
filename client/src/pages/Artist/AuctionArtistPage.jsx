import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ArtistHeader from "../../components/headers/ArtistHeader";
import { useTheme } from "@emotion/react";
import { getAuctionsByArtist } from "../../api/auctionApi";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import ActiveAuctionsForm from "../../components/forms/ActiveAuctionsForm";

const AuctionPage = () => {
    const theme = useTheme();

    const { id } = useParams();

    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [auctionData, setAuctionData] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const loadData = async () => {
            const response =  await getAuctionsByArtist(id)

            if (!response) {
                displayError("Сервис временно недоступен");
                return;
            }

            if (response.status === 401) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("role");
                window.location.reload();
            }

            if (response.status >= 300) {
                displayError("Ошибка при загрузке профиля. Код: " + response.status);
                console.log(response);
                return;
            }

            setAuctionData(response.data);
        };

        loadData();
    }, []);

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    console.log("Auction data:", auctionData); // Добавьте этот вывод

    return (
        <>
        <ArtistHeader/>
        <Typography
        variant="h2"
        height={"69px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        textAlign="center"
        margin={"30px 0"}>
        Активные аукционы
        </Typography>
        
        {auctionData.length > 0 ? (
    <>

<Grid
  container
  item
  spacing={2}
  justifyContent="center"
  alignItems="center"
  flexDirection={"row"} // изменено на row
  flexWrap={"wrap"} // добавлено свойство flexWrap
  gap={2} // добавлено свойство gap
>
  {auctionData.map((report) => (
    <Grid key={report.id} item xs={12} md={6} lg={3}    margin={"0 40px"}>
      <ActiveAuctionsForm auction={report} />
    </Grid>
  ))}
</Grid>
    </>
) : (
    <Typography
        variant="h3"
        height={"69px"}
        display={"flex"}
        alignItems={"center"}
    >
        Нет активных аукционов
    </Typography>
)}

    <Footer/>
        </>
      );
      
};

export default AuctionPage;