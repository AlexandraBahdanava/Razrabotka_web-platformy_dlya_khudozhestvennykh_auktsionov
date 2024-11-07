import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/en-gb";
import AppRouter from "./router/AppRouter.jsx";

const App = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
            },
            text: {
                main: "#42526D",
            },
            button:{
                backgroundColor: "#1976D2", // Синий цвет
                color: "#FFFFFF", // Белый цвет текста
                borderRadius: "16px", // Скругленные углы
                padding: "10px 20px", // Ваш padding
                fontSize: "14px", // Ваш размер шрифта
                border: "none", // Убираем границу
                cursor: "pointer", // Указатель при наведении
            }
        },
        typography: {
            h1: {
                fontSize: "14px",
            },
            h2: {
                fontSize: "24px",
            },
            h3: {
                fontSize: "16px",
            },
        },
    });
        return (
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
                    <ThemeProvider theme={theme}>
                        <AppRouter />
                    </ThemeProvider>
                </LocalizationProvider>
            </BrowserRouter>
        );
    };

export default App;
