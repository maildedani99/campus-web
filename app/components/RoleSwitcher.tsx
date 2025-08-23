"use client"

import { Box, Button } from "@mui/material"

export default function RoleSwitcher() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        p: 1,
        backgroundColor: "#111",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        href="/campus/client"
        sx={{ color: "white", borderColor: "white" }}
      >
        Client
      </Button>
      <Button
        variant="outlined"
        size="small"
        href="/campus/teacher"
        sx={{ color: "white", borderColor: "white" }}
      >
        Teacher
      </Button>
      <Button
        variant="outlined"
        size="small"
        href="/campus/admin"
        sx={{ color: "white", borderColor: "white" }}
      >
        Admin
      </Button>
    </Box>
  )
}
