import * as React from 'react';
import { getUser } from '../auth/services/user.service';

function AppLayout({ children }: any) {
  const user = getUser();

  return (
    <>
      <div>Navigatiebalk hier</div>

      <div style={{ flexGrow: 1, maxWidth: "100%" }}>{children}</div>
    </>
  );
}

export default AppLayout;
