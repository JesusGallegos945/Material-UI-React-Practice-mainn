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
  // Extrae el parámetro "id" de la URL para usarlo en la consulta a la API
  let { id } = useParams();
  
  // Estado para almacenar los detalles de la comida obtenida de la API
  const [meal, setMeal] = useState(null);

  // useEffect se ejecuta cuando el componente se monta o cuando cambia el "id"
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        // Realiza la consulta a la API utilizando el id extraído
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        // Si se reciben datos, se actualiza el estado con la primera comida encontrada
        if (result.meals && result.meals.length > 0) {
          setMeal(result.meals[0]);
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la comida:", error);
      }
    };

    fetchMealDetails();
  }, [id]);

  // Muestra un mensaje de "Cargando" mientras se espera la respuesta de la API
  if (!meal) {
    return <Typography sx={{ textAlign: "center", marginTop: 4 }}>Cargando los datos...</Typography>;
  }

  return (
    <div>
      <Grid container padding={4} spacing={4} justifyContent="center">
        {/* Contenedor principal con Paper para los detalles de la comida */}
        <Paper sx={{ padding: 2, margin: 2, borderRadius: "10px" }}>
          {/* Título con el nombre de la comida */}
          <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
            {meal.strMeal}
          </Typography>
          {/* Imagen de la comida con estilos personalizados */}
          <CardMedia
            component="img"
            height="500"
            image={meal.strMealThumb}
            alt={meal.strMeal}
            sx={{ borderRadius: "30px", margin: "0 auto", width: "50%" }}
          />
          <CardContent>
            {/* Información de categoría y origen de la comida */}
            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center", fontSize: "30px" }}>
              <strong>Categoría:</strong> {meal.strCategory} | <strong>Origen:</strong> {meal.strArea}
            </Typography>

            {/* Muestra el identificador único de la comida */}
            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center", fontSize: "30px" }}>
              <strong>Id_Comida:</strong> {id}
            </Typography>

            {/* Acordeón que lista los ingredientes de la receta */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" sx={{ fontSize: "30px" }}>
                  <strong>Ingredientes</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul style={{ paddingLeft: "20px", fontSize: "20px" }}>
                  {Array.from({ length: 20 }).map((_, i) => {
                    // Obtiene cada ingrediente y su medida de la respuesta
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

            {/* Acordeón que muestra las instrucciones para preparar la comida */}
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

            {/* Botón que redirige a YouTube para ver la receta, si está disponible */}
            {meal.strYoutube && (
              <Button
                variant="contained"
                color="secondary"
                href={meal.strYoutube}
                target="_blank"
                sx={{ marginTop: "15px", width: "100%", fontSize: "20px" }}
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
