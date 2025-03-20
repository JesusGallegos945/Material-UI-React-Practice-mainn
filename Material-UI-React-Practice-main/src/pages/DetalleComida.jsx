import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";

export default function DetalleComida() {
  let { id } = useParams();
  const [obra, setObra] = useState(null);

  useEffect(() => {
    const fetchObraDetails = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,artist_title,date_display,medium_display,description,dimensions,credit_line`
        );
        const result = await response.json();
        if (result.data) {
          setObra(result.data);
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la obra:", error);
      }
    };

    fetchObraDetails();
  }, [id]);

  if (!obra) {
    return <Typography sx={{ textAlign: "center", marginTop: 4, color: "#fff" }}>Cargando los datos...</Typography>;
  }

  const imagenUrl = obra.image_id
    ? `https://www.artic.edu/iiif/2/${obra.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/500x300?text=Imagen+no+disponible";

  return (
    <div style={{ backgroundColor: "#262626", minHeight: "100vh", padding: "20px" }}>
      <Grid container spacing={2} padding={2}>
        {/* Columna de la imagen */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 1,
              borderRadius: "10px",
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#404040",
            }}
          >
            <CardMedia
              component="img"
              height="400" // Reducir la altura de la imagen
              image={imagenUrl}
              alt={obra.title}
              sx={{ borderRadius: "8px", objectFit: "cover", width: "100%" }}
            />
          </Paper>
        </Grid>

        {/* Columna de la descripción */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: "10px",
              boxShadow: 3,
              backgroundColor: "#404040",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                marginBottom: 2,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {obra.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginBottom: 2, textAlign: "center", fontSize: "16px", color: "#fff" }}
            >
              <strong>Artista:</strong> {obra.artist_title || "Desconocido"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginBottom: 2, textAlign: "center", fontSize: "16px", color: "#fff" }}
            >
              <strong>Fecha:</strong> {obra.date_display || "Desconocida"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginBottom: 2, textAlign: "center", fontSize: "16px", color: "#fff" }}
            >
              <strong>Medio:</strong> {obra.medium_display || "No especificado"}
            </Typography>

            <Accordion sx={{ marginBottom: 2, backgroundColor: "#333" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  Descripción
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "justify", whiteSpace: "pre-line", fontSize: "14px", color: "#fff" }}
                >
                  {obra.description || "No hay descripción disponible."}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ marginBottom: 2, backgroundColor: "#333" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  Dimensiones
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "justify", whiteSpace: "pre-line", fontSize: "14px", color: "#fff" }}
                >
                  {obra.dimensions || "No hay información sobre dimensiones."}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ marginBottom: 2, backgroundColor: "#333" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  Línea de crédito
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "justify", whiteSpace: "pre-line", fontSize: "14px", color: "#fff" }}
                >
                  {obra.credit_line || "No hay información sobre la línea de crédito."}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}