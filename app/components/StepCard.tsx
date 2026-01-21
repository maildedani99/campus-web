'use client';

import * as React from 'react';
import { Box, Button, Typography, Stack, Paper } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { CheckCircle2 } from 'lucide-react';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  done: boolean;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  actionText?: string;
};

export default function StepCard({
  icon,
  title,
  description,
  done,
  onClick,
  disabled,
  loading,
  actionText = 'Ir',
}: Props) {
  const theme = useTheme();

  return (
    <Paper
      elevation={done ? 2 : 1}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: done ? alpha(theme.palette.success.light, 0.1) : '#fff',
        border: done
          ? `1px solid ${alpha(theme.palette.success.main, 0.3)}`
          : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: disabled || done ? 'none' : 'translateY(-2px)',
          boxShadow: disabled || done ? undefined : '0 3px 10px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              backgroundColor: done
                ? alpha(theme.palette.success.main, 0.15)
                : alpha(theme.palette.error.main, 0.12),
              color: done ? theme.palette.success.main : theme.palette.error.main,
            }}
          >
            {done ? <CheckCircle2 size={24} /> : icon}
          </Box>

          <Box textAlign="left">
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: done ? theme.palette.success.dark : theme.palette.text.secondary }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        <Button
          variant={done ? 'outlined' : 'contained'}
          color={done ? 'success' : 'error'}
          onClick={onClick}
          disabled={Boolean(done || disabled || loading)}
          sx={{ whiteSpace: 'nowrap', fontWeight: 800, px: 2.5 }}
        >
          {done ? 'Completado' : loading ? 'Cargando…' : actionText}
        </Button>
      </Stack>
    </Paper>
  );
}
