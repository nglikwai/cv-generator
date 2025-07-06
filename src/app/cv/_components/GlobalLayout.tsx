import { ReactNode } from 'react';

import ActionPanel from './ActionPanel';
import Login from './Login';

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ActionPanel />
      <Login />
      {children}
    </>
  );
};
