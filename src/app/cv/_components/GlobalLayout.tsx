import { ReactNode } from 'react';

import Login from './Login';

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Login />
      {children}
    </>
  );
};
