"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

export default function VerifiedClient() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isSuccess = status === "success";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 480 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5" component="h1">
            {isSuccess
              ? "Email verificado"
              : "No se ha podido verificar tu email"}
          </Typography>

          <Typography variant="body1" align="center">
            {isSuccess
              ? "Ya puedes iniciar sesión con tu cuenta en el Campus Rebirth."
              : "El enlace no es válido o ha caducado. Solicita un nuevo email de verificación desde la pantalla de login."}
          </Typography>

          <Button
            component={Link}
            href="/auth/login"
            variant="contained"
            color="primary"
          >
            Ir a iniciar sesión
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
