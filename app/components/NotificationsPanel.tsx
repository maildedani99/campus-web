"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNotifications } from "../context/NotificationsContext"
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
import AssignmentIcon from "@mui/icons-material/Assignment"

export default function NotificationsPanel() {
  const { open } = useNotifications()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          style={{ position: "fixed", top: 70, right: 24, zIndex: 1300 }}
        >
          <Paper
            elevation={6}
            sx={{
              width: 320,
              borderRadius: 2,
              p: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Notificaciones
            </Typography>

            <List dense>
              <ListItem
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  mb: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <ListItemIcon>
                  <EventIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="📅 Cita con Romina – martes 5 agosto" />
              </ListItem>

              <ListItem
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="📝 Tarea de audio pendiente esta mañana" />
              </ListItem>
            </List>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
