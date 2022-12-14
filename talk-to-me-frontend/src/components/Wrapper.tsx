import React, { ReactNode } from 'react';

export function Wrapper({ children }: { children?: ReactNode }) {
  return (
    <div style={{ padding: 3}}>
      {children}
    </div>
  );
}