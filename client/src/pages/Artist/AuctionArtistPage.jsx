import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import ArtistHeader from "../../components/headers/ArtistHeader";
import { getAuctionsByArtist } from "../../api/auctionApi";
import Footer from "../../components/Footer";
import ActiveAuctionsForm from "../../components/forms/ActiveAuctionsForm";

const AuctionPage = () => {
  const [auctionData, setAuctionData] = useState([]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await getAuctionsByArtist();

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

  return (
    <>
      <ArtistHeader />
      <Typography
        variant="h2"
        height={"69px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        textAlign="center"
        margin={"30px 0"}
      >
        Активные аукционы
      </Typography>

      {auctionData.length > 0 ? (
        <>
          <Grid
            container
            item
            spacing={2}
            justifyContent="center"
            alignItems="flex-start"
            flexDirection={"row"} // изменено на row
            flexWrap={"wrap"} // добавлено свойство flexWrap
            gap={2} // добавлено свойство gap
          >
            {auctionData.map((report) => (
              <Grid
                key={report.id}
                item
                xs={12}
                md={6}
                lg={3}
                margin={"0 40px"}
              >
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

      <Footer />
    </>
  );
};

export default AuctionPage;
