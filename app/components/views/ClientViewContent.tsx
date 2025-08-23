"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import SchoolIcon from "@mui/icons-material/School";
import { type Client } from "@/app/data/clients";

type Props = {
  client: Client;
  onClose?: () => void;
  onSave?: (updated: Client) => void;
};

// Forzamos LIGHT solo dentro del modal
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#D60001" },
  },
});

export default function ClientViewContent({ client, onClose, onSave }: Props) {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<Client>(client);

  const remaining = useMemo(() => {
    const price = form.coursePrice ?? 0;
    const paid = form.totalPaid ?? 0;
    return Math.max(price - paid, 0);
  }, [form.coursePrice, form.totalPaid]);

  const handleChange =
    (key: keyof Client) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val =
        key === "coursePrice" || key === "totalPaid"
          ? Number(e.target.value)
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: val as any }));
    };

  const handleSave = () => onSave?.(form);

  return (
    <ThemeProvider theme={lightTheme}>
      <Paper
        elevation={2}
        sx={{
          // ancho FIJO dentro del modal, con fallback en pantallas pequeñas
          width: 920,
          maxWidth: "100%",
          mx: "auto",
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          bgcolor: "#fff",
          color: "#111",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            src={form.avatarUrl}
            alt={form.name}
            sx={{ width: 64, height: 64, border: "2px solid #eee" }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" fontWeight={700} noWrap>
              {form.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {form.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {onClose && (
              <Button variant="outlined" onClick={onClose}>
                Cerrar
              </Button>
            )}
            <Button variant="contained" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Perfil" />
          <Tab label="Pagos" />
          <Tab label="Cursos" />
        </Tabs>

        {/* PERFIL */}
        {tab === 0 && (
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            <TextField label="Nombre" value={form.name ?? ""} onChange={handleChange("name")} fullWidth />
            <TextField label="Email" value={form.email ?? ""} onChange={handleChange("email")} fullWidth />
            <TextField label="DNI" value={form.dni ?? ""} onChange={handleChange("dni")} fullWidth />
            <TextField label="Teléfono" value={form.phone ?? ""} onChange={handleChange("phone")} fullWidth />
            <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
              <TextField label="Dirección" value={form.address ?? ""} onChange={handleChange("address")} fullWidth />
            </Box>
            <Box sx={{ maxWidth: 320 }}>
              <TextField label="Código Postal" value={form.zip ?? ""} onChange={handleChange("zip")} fullWidth />
            </Box>
          </Box>
        )}

        {/* PAGOS */}
        {tab === 1 && (
          <Box>
            {/* Campos de edición */}
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                mb: 2,
              }}
            >
              <TextField
                label="Precio del curso"
                type="number"
                value={form.coursePrice ?? 0}
                onChange={handleChange("coursePrice")}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Total pagado"
                type="number"
                value={form.totalPaid ?? 0}
                onChange={handleChange("totalPaid")}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditScoreIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Falta por pagar"
                value={remaining}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Totales (no “duplicado”: resumen con contraste alto) */}
            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 2, bgcolor: "#fafafa", borderColor: "#e5e7eb" }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: "#111" }}>
                Totales
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                }}
              >
                <Metric title="Precio" value={`${form.coursePrice ?? 0} €`} />
                <Metric title="Pagado" value={`${form.totalPaid ?? 0} €`} />
                <Metric title="Pendiente" value={`${remaining} €`} highlight />
              </Box>
            </Paper>
          </Box>
        )}

        {/* CURSOS */}
        {tab === 2 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Cursos inscritos
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {(form.courses ?? []).map((c) => (
                <Chip key={c.id} icon={<SchoolIcon />} label={c.title} variant="outlined" color="primary" />
              ))}
              {(!form.courses || form.courses.length === 0) && (
                <Typography variant="body2" color="text.secondary">
                  Sin cursos todavía.
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" size="small" onClick={() => alert("TODO: añadir curso")}>
                Añadir curso
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </ThemeProvider>
  );
}

function Metric({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: highlight ? "rgba(214,0,1,0.06)" : "#fff",
        borderColor: "#e5e7eb",
      }}
    >
      <Typography variant="caption" sx={{ color: "#6b7280" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111" }}>
        {value}
      </Typography>
    </Paper>
  );
}
