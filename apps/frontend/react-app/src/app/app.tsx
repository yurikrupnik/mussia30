// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.css';
import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, Link } from 'react-router-dom';
import { useInterpret } from '@xstate/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import toggleMachine from './xstate';

import Users from './routes/users';
import Main from './routes/main';
import Login from './routes/login';
export const GlobalStateContext = createContext({});

const queryClient = new QueryClient();

export function App() {
  const toggleService = useInterpret(toggleMachine);
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <GlobalStateContext.Provider value={{ toggleService }}>
        {/* START: routes */}
        {/* These routes and navigation have been generated for you */}
        {/* Feel free to move and update them to fit your needs */}
        <h1>Welcome frontend-react-app</h1>
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
        </Routes>
        {/* END: routes */}
      </GlobalStateContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
