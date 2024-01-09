import React, { useState } from "react";
import { Button, Grid } from "@mui/material";


const ArtistAuctionButton = () => {
  const [activeButton, setActiveButton] = useState("active"); // "active" или "archive"

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          variant={activeButton === "active" ? "contained" : "outlined"}
          fullWidth
          onClick={() => handleButtonClick("active")}
        >
          Активные
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant={activeButton === "archive" ? "contained" : "outlined"}
          fullWidth
          onClick={() => handleButtonClick("archive")}
        >
          Архив
        </Button>
      </Grid>

      {/* Форма для отображения аукционов */}
      {activeButton === "active" && <ActiveAuctionsForm />}

      {/* Форма для отображения архивных аукционов */}
      {activeButton === "archive" && <ArchiveAuctionsForm />}
    </Grid>
  );
};

export default ArtistAuctionButton;

// Ваши формы (YourActiveAuctionsForm и YourArchiveAuctionsForm) должны быть реализованы отдельно.
