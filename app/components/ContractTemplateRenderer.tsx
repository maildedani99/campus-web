'use client';

import React from 'react';

type Props = {
  template: string;
  data: Record<string, any>;
};

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

function renderTemplate(tpl: string, ctx: Record<string, any>) {
  // Reemplaza {{ algo.algo }} por el valor en ctx
  return tpl.replace(/\{\{\s*([^\s}]+)\s*\}\}/g, (_, path) => {
    const v = getByPath(ctx, path);
    return v == null ? '' : String(v);
  });
}

export default function ContractTemplateRenderer({ template, data }: Props) {
  // 🔴 IMPORTANTE: pasamos { data } como contexto,
  // para que {{data.client.firstName}} funcione
  const html = renderTemplate(template, { data });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
