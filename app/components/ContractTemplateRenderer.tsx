'use client';

import * as React from 'react';
import { Box } from '@mui/material';

type Props = {
  template: string;                 // texto o HTML con {{variables}}
  data: Record<string, any>;        // ej. { client: { firstName: 'Ana' } }
  asHtml?: boolean;                 // true si la plantilla ya es HTML
};

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
}

function renderTemplate(tpl: string, ctx: Record<string, any>) {
  // Reemplaza {{ algo.algo }} por el valor en ctx
  return tpl.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (_, path) => {
    const v = getByPath(ctx, path);
    return v == null ? '' : String(v);
  });
}

export default function ContractTemplateRenderer({ template, data, asHtml = false }: Props) {
  const out = React.useMemo(() => renderTemplate(template, data), [template, data]);

  if (asHtml) {
    return (
      <Box
        sx={{ p: 2, bgcolor: '#111', border: '1px solid #222', borderRadius: 1, lineHeight: 1.6 }}
        dangerouslySetInnerHTML={{ __html: out }}
      />
    );
  }

  // Plantilla como texto plano (respeta saltos de línea)
  return (
    <Box
      sx={{ p: 2, bgcolor: '#111', border: '1px solid #222', borderRadius: 1, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}
    >
      {out}
    </Box>
  );
}
