import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 25,
    fontFamily: ['"IBM Plex Sans"', "sans-serif"].join(","),
  },
});

export default theme;
