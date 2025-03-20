import React from "react";
import { Container, Typography, Grid, Avatar, Box, Divider, Paper } from "@mui/material";

export default function PageAbout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000000",
        color: "white",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "rgba(38, 38, 38, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              Jesús Gallegos Gaspar
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", opacity: 0.9 }}>
              Estudiante de Desarrollo de Software Multiplataforma en la Universidad Tecnológica de la Riviera Maya.
              <br />
              Técnico en Matemático Financiero.
              <br />
              Preparatoria: Colegio de Bachilleres 01.
              <br />
              Me gusta jugar videojuegos como PUBG y League of Legends.
              <br />
              Tengo 19 años y trabajo.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "rgba(255, 255, 255, 0.5)" }} />
      </Paper>
    </Box>
  );
}


