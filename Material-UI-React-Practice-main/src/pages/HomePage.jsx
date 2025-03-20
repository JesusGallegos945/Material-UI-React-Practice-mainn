import React, { useState, useEffect } from "react";
import { Paper, InputBase, IconButton, Card, Typography, Container, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import ContenidoComida from "./ContenidoComida";

export default function HomePage() {
  const [textoBuscar, setTextoBuscar] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const obtenerObrasPorNombre = async () => {
    const buscar = textoBuscar.trim();

    if (buscar === "") {
      alert("Campo vacío, pon algo mínimo");
    } else {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${buscar}&fields=id,title,image_id,artist_title,date_display,medium_display&page=${page}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
  };

  const cargarMasObras = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_title,date_display,medium_display&limit=10&page=${page + 1}`
      );
      const result = await response.json();
      setData([...data, ...result.data]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error al cargar más obras:", error);
    }
  };

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_title,date_display,medium_display&limit=10"
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    obtenerData();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      obtenerObrasPorNombre();
    }
  };

  const obrasConImagenes = data.filter((obra) => obra.image_id);

  return (
    <div style={{ backgroundColor: "#1F1F1F", minHeight: "100vh", padding: 0, margin: 0 }}>
      <Container sx={{ padding: 2, backgroundColor: "#1F1F1F", color: "#fff", maxWidth: "100%", margin: 0 }}>
        {/* Barra de búsqueda */}
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginBottom: 4, padding: 0 }}>
          <Grid item xs={12} md={8} lg={6}>
            <Card
              sx={{
                padding: 0,
                borderRadius: "40px",
                boxShadow: "none",
                backgroundColor: "#262626",
              }}
            >
              <Paper
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  boxShadow: 3,
                  width: "100%",
                  backgroundColor: "#262626",
                }}
              >
                <InputBase
                  sx={{ ml: 0.5, flex: 5, fontSize: "16px", color: "#fff" }}
                  placeholder="Buscar obras de arte..."
                  value={textoBuscar}
                  onChange={(e) => setTextoBuscar(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <IconButton
                  onClick={obtenerObrasPorNombre}
                  sx={{ p: "5px" }}
                  color="#262626"
                >
                  <SearchIcon sx={{ fontSize: "24px", color: "#fff" }} />
                </IconButton>
              </Paper>
            </Card>
          </Grid>
        </Grid>

        {/* Contenedor de las tarjetas */}
        <Grid container spacing={2} sx={{ padding: 0, margin: 0 }}>
          {obrasConImagenes.length > 0 ? (
            obrasConImagenes.map((obra, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    backgroundColor: "#262626",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <ContenidoComida data={[obra]} />
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  marginTop: 4,
                }}
              >
                No se encontraron obras con imágenes.
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Botón para cargar más obras */}
        <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            onClick={cargarMasObras}
            sx={{ backgroundColor: "#262626", color: "#fff", '&:hover': { backgroundColor: "#333" } }}
          >
            Ver más
          </Button>
        </Grid>
      </Container>
    </div>
  );
}