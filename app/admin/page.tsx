'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
} from '@mui/material'

export default function ConfigPage() {
  const [values, setValues] = useState({
    course: 'semana 23',
    paymentType: 'spain total',
    customAmount: '',
    tutor: 'david',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSave = () => {
    console.log('Configuración guardada:', values)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: 480, sm: 600 },
          backgroundColor: '#1e1e1e',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Typography variant="h5" sx={{ color: '#fff', mb: 3, fontWeight: 'bold' }}>
          Opciones de cliente
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              name="course"
              label="Curso"
              value={values.course}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}
            >
              <MenuItem value="semana 23">Semana 23</MenuItem>
              <MenuItem value="semana 24">Semana 24</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              name="paymentType"
              label="Forma de pago"
              value={values.paymentType}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}
            >
              <MenuItem value="spain total">Spain Total</MenuItem>
              <MenuItem value="spain frac">Spain Fraccionado</MenuItem>
              <MenuItem value="eu total">EU Total</MenuItem>
              <MenuItem value="custom">Personalizado</MenuItem>
            </TextField>
          </Grid>

          {values.paymentType === 'custom' && (
            <Grid item xs={12}>
              <TextField
                name="customAmount"
                label="Importe personalizado (€)"
                type="number"
                fullWidth
                value={values.customAmount}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{
                  style: {
                    color: '#fff',
                    backgroundColor: '#2a2a2a',
                  },
                }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              select
              name="tutor"
              label="Tutor asignado"
              value={values.tutor}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}
            >
              <MenuItem value="david">David</MenuItem>
              <MenuItem value="oscar">Oscar</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              sx={{
                mt: 2,
                backgroundColor: '#ef4444',
                color: '#fff',
                fontWeight: 'bold',
                ':hover': { backgroundColor: '#dc2626' },
              }}
            >
              Guardar configuración
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
