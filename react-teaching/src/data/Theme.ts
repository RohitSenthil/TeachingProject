import { createTheme, responsiveFontSizes } from "@mui/material/styles";
let theme = createTheme({
    palette: {
        primary: {
            main: '#00897b',
        },
        secondary: {
            main: '#008937',
        },
    },
})
theme = responsiveFontSizes(theme)
export default theme