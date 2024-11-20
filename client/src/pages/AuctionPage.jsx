import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAuction } from "../api/auctionApi";
import { Box, Typography, Grid } from "@mui/material";
import CollectorHeader from "../components/headers/CollectorHeader";
import ArtistHeader from "../components/headers/ArtistHeader";
import PublicHeader from "../components/headers/PublicHeader";
import Footer from "../components/Footer";
import BidButton from "../components/forms/BidButton";

const AuctionPage = () => {
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState({});
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuction(id);
        setAuctionData(response.data);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleBidSuccess = () => {
    console.log("Ставка успешно совершена!");
  };

  const handleBidError = (errorMessage) => {
    console.error("Ошибка при совершении ставки:", errorMessage);
  };

  const renderHeader = () => {
    switch (role) {
      case "artist":
        return <ArtistHeader />;
      case "collector":
        return <CollectorHeader />;
      default:
        return <PublicHeader />;
    }
  };

  const boxStyle = {
    width: "100%",
    padding: "20px",
    border: "3px solid #091E42",
    borderRadius: "20px",
  };

  if (!auctionData || Object.keys(auctionData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {renderHeader()}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          width: "60%",
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid margin={"40px"}>
          <img
            src={auctionData.photo || "https://via.placeholder.com/800"}
            alt="Auction"
            style={{
              objectFit: "cover",
              maxWidth: "800px",
              maxHeight: "800px",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Box
          sx={{
            margin: "auto",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography variant="h2" textAlign={"center"} margin={"20px 300px"}>
            Начальная цена: {`$${auctionData.starting_price}`}
          </Typography>
        </Box>
        {auctionData.bidding === 0 && (
          <Box sx={boxStyle}>
            <Typography
              fontSize={"14px"}
              color={"#1D2939"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Возможность биддинга включена:
            </Typography>
            <Typography variant="h1" textAlign={"center"}>
              Нажмите “Купить сейчас”, чтобы стать владельцем этого предмета
              немедленно
            </Typography>
          </Box>
        )}
        {auctionData.auto_renewal === 0 && (
          <Box sx={boxStyle}>
            <Typography
              fontSize={"14px"}
              color={"#1D2939"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Автопродление аукциона включено:
            </Typography>
            <Typography variant="h1" textAlign={"center"}>
              Ставки за последние 10 минут продлевают аукцион.
            </Typography>
          </Box>
        )}
        <BidButton
          auctionId={auctionData.id}
          onBidSuccess={handleBidSuccess}
          onBidError={handleBidError}
        />
      </Grid>
      <Footer />
    </>
  );
};

export default AuctionPage;
