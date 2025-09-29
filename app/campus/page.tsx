'use client';

import RequireActive from "../auth/RequireActive";
import RequireAuth from "../auth/RequireAuth";


export default function DashboardPage() {
  return (
    <RequireAuth>
<RequireActive inactivePath="/campus/inactive">
        <div style={{ padding: 24, color: '#fff' }}>
          <h1>Dashboard</h1>
          <p>Contenido del campus…</p>
        </div>
      </RequireActive>
    </RequireAuth>
  );
}
