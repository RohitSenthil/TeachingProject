import Home from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorImage from "../images/404Error.svg"

function Error404Page() {
  let navigate = useNavigate()
  return (
    <Box sx={{
      position: 'relative', flexGrow: 1, display: "flex", flexDirection: "column",
      alignItems: "center",
    }}>
      <img src={ErrorImage} alt={"Error 404"} style={{ maxWidth: "50%", maxHeight: "50%", margin: "1em 0 1em 0" }} />

      <Typography variant="h6" align={"center"} sx={{ maxWidth: "100%", overflowWrap: "anywhere", wordWrap: "break-word", margin: "1em 0 1em 0" }}>Sorry, but we can't find that page. We can find the home page though.
      </Typography>
      <Button variant="contained" endIcon={<Home />} onClick={() => navigate("/")} sx={{ margin: "1em 0 1em 0" }}>Home</Button>

    </Box>
  )
}
export default Error404Page