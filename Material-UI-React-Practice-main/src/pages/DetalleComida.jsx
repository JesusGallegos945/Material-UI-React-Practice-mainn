import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Grid from "@mui/material/Grid2";

export default function DetalleComida() {
  let { id } = useParams();

  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        if (result.meals && result.meals.length > 0) {
          setMeal(result.meals[0]);
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la comida:", error);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (!meal) {
    return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Cargando los datos...</Typography>;
  }

  return (
    <div>
      <Grid container padding={4} spacing={4} justifyContent="center">
        <Paper sx={{ padding: 2, margin: 2, borderRadius: "10px" }}>
          <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
            {meal.strMeal}
          </Typography>
          <CardMedia
            component="img"
            height="500"
            image={meal.strMealThumb}
            alt={meal.strMeal}
            sx={{ borderRadius: "30px", margin: "0 auto", width: "50%" }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center", fontSize: "30px" }}>
              <strong>Categoría:</strong> {meal.strCategory} | <strong>Origen:</strong> {meal.strArea}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center", fontSize: "30px" }}>
              <strong>Id_Comida:</strong> {id}
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" sx={{ fontSize: "30px" }}>
                  <strong>Ingredientes</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul style={{ paddingLeft: "20px", fontSize: "20px" }}>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const ingrediente = meal[`strIngredient${i + 1}`];
                    const medida = meal[`strMeasure${i + 1}`];
                    return ingrediente ? (
                      <li key={i}>
                        {medida} {ingrediente}
                      </li>
                    ) : null;
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span"  sx={{ fontSize: "30px" }} >
                  <strong>Instrucciones</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ textAlign: "justify", whiteSpace: "pre-line", fontSize: "20px" }}>
                  {meal.strInstructions}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {meal.strYoutube && (
              <Button
                variant="contained"
                color="secondary"
                href={meal.strYoutube}
                target="_blank"
                sx={{ marginTop: "20px", width: "100%", fontSize: "20px" }}
              >
                 Ver Receta en YouTube
              </Button>
            )}
          </CardContent>
        </Paper>
      </Grid>
    </div>
  );
}
