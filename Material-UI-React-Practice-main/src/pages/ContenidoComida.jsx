import {
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

export default function ContenidoComida({ data }) {
  console.log("Datos desde padre:", data);

  const noResults = (
    <Grid container padding={4} spacing={3} justifyContent="center">
      <Paper
        sx={{
          p: 2,
          textAlign: "center",
          backgroundColor: "#fdecea",
          color: "#b71c1c",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "30px" }}>
          No se encontraron resultados
        </Typography>
      </Paper>
    </Grid>
  );

  const renderRecetas = (
    <Grid container padding={4} spacing={3} justifyContent="center">
      {data.map((recetadata, index) => (
        <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
          <Paper sx={{ padding: 3, borderRadius: "15px", boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="250"
              image={recetadata.strMealThumb}
              alt={recetadata.strMeal}
              sx={{ borderRadius: "10px" }}
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "28px",
                  marginBottom: "10px",
                }}
              >
                {recetadata.strMeal}
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <strong>Categoría:</strong> {recetadata.strCategory} |{" "}
                <strong>Origen:</strong> {recetadata.strArea}
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <strong>Id_Comida:</strong> {recetadata.idMeal}
              </Typography>

              <Accordion sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Ingredientes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
                    {Array.from({ length: 20 }).map((_, i) => {
                      const ingrediente = recetadata[`strIngredient${i + 1}`];
                      const medida = recetadata[`strMeasure${i + 1}`];
                      return ingrediente ? (
                        <li key={i}>
                          {medida} {ingrediente}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Cómo preparar
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      whiteSpace: "pre-line",
                      fontSize: "16px",
                    }}
                  >
                    {recetadata.strInstructions}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {recetadata.strYoutube && (
                <Button
                  variant="contained"
                  color="info"
                  href={recetadata.strYoutube}
                  target="_blank"
                  sx={{
                    marginTop: "15px",
                    width: "100%",
                    fontSize: "18px",
                    borderRadius: "8px",
                    backgroundColor: "#ff6f61",
                    "&:hover": {
                      backgroundColor: "#e44d3a",
                    },
                  }}
                >
                  Ver Receta en YouTube
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                LinkComponent={Link}
                to={`/recetas/${recetadata.idMeal}`}
                sx={{
                  marginTop: "15px",
                  width: "100%",
                  fontSize: "18px",
                  borderRadius: "8px",
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
              >
                Ver más
              </Button>
            </CardContent>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return <div>{!data || data.length === 0 ? noResults : renderRecetas}</div>;
}
