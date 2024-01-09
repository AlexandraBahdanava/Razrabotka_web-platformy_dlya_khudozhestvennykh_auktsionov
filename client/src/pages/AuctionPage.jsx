import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuction } from "../api/auctionApi";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import AuctionRates from "../components/forms/AuctionRates";
import { useParams } from "react-router-dom";
import CollectorHeader from "../components/headers/CollectorHeader";
import Footer from "../components/Footer";
import BidButton from "../components/forms/BidButton";

const AuctionPage = () => {
  const location = useLocation();
 // const auctionId = location.state?.idAuction;
const {id}=useParams();
  const [auctionData, setAuctionData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuction(id);

        setAuctionData(response.data);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };
    if (id) {
        console.log(auctionData);
      fetchData();
    }
  }, [id]);

  if (!auctionData) {
    return <div>Loading...</div>;
  }

  const handleBidSuccess = () => {
    console.log("Ставка успешно совершена!");
    // Дополнительные действия после успешной ставки
  };

  const handleBidError = (errorMessage) => {
    console.error("Ошибка при совершении ставки:", errorMessage);
    // Дополнительные действия при ошибке ставки
  };
  return (
    <>
      <CollectorHeader />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          width: "60%", // 80% ширины экрана
          margin: "auto", // размещение по центру
          border: "1px solid #ccc", // серые границы
          borderRadius: "20px",
          padding: "20px", // внутренние отступы по 20px
          marginTop: "20px", // внешний отступ сверху
          marginBottom:"20px"
        }}
      >
        <Grid margin={"40px"}>
          <img
            src={auctionData.photo}
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
            margin:"auto",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography variant="h2" textAlign={"center"} margin={"20px 300px"}>
            Начальная цена: {`$${auctionData.starting_price}`}
          </Typography>
        </Box>
        <>
          {auctionData.bidding == 0 ? (
            <>
              <Box width={"100%"} padding={"20px"} border={ "3px solid #091E42"}
          borderRadius={ "20px"}>
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
            </>
          ) : (
            <></>
          )}
        </>
        <>
          {auctionData.auto_renewal == 0 ? (
            <>
              <Box width={"100%"} padding={"20px"} border={ "3px solid #091E42"}
          borderRadius={ "20px"}>
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
            </>
          ) : (
            <></>
          )}
        </>
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
