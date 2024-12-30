import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: "16px", top: "16px" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: "8px" }}
      >
        Подтвердите удаление
      </DialogTitle>
      <DialogContent variant="body2" sx={{ marginBottom: "24px" }}>
        Вы уверены, что хотите удалить это портфолио?
      </DialogContent>

      <DialogActions container justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "#dcdcdc",
            color: "#333",
            "&:hover": { borderColor: "#007aff", backgroundColor: "#f6f8fa" },
          }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          sx={{ color: "#fff", backgroundColor: "#091E42" }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
