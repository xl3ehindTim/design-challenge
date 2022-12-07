import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

export function Wrapper({ children }: { children?: ReactNode }) {
  return (
    <Box sx={{ 
      p: 3
    }}>
      {children}
    </Box>
  );
}