import {
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ContenidoComida({ data }) {
  const obra = data[0]; // Acceder al primer elemento del array

  if (!obra || !obra.image_id) {
    return null; // Si no hay datos o no hay imagen, no renderizar nada
  }

  const imagenUrl = `https://www.artic.edu/iiif/2/${obra.image_id}/full/843,/0/default.jpg`;

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: "10px",
        boxShadow: 3,
        height: "100%",
        backgroundColor: "#404040",
      }}
    >
      <CardMedia
        component="img"
        height="200" // Reducir la altura de la imagen
        image={imagenUrl}
        alt={obra.title}
        sx={{ borderRadius: "8px", objectFit: "cover", width: "100%" }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          {obra.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: "12px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          <strong>Artista:</strong> {obra.artist_title || "Desconocido"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: "12px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          <strong>Fecha:</strong> {obra.date_display || "Desconocida"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: "12px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          <strong>Medio:</strong> {obra.medium_display || "No especificado"}
        </Typography>

        <Button
          variant="contained"
          LinkComponent={Link}
          to={`/recetas/${obra.id}`}
          sx={{
            marginTop: "10px",
            width: "100%",
            fontSize: "14px",
            borderRadius: "8px",
            backgroundColor: "#262626",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1a1a1a",
            },
          }}
        >
          Ver más
        </Button>
      </CardContent>
    </Paper>
  );
}