// import Main from './components/todos/todos';
import { Route, Routes, Link } from 'react-router-dom';
import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { createMachine } from 'xstate';
import Main from './routes/main';
import Todos from './routes/todos';
import Users from './routes/users';
import About from './routes/about';
import { GlobalStateContext } from './context';
import { toggleMachine } from '@mussia30/node/xstate-machines';

export function App() {
  const toggleService = useInterpret(toggleMachine);
  return (
    <GlobalStateContext.Provider value={{ toggleService }}>
      <h1>Welcome frontend-react-app</h1>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      {/* END: routes */}
    </GlobalStateContext.Provider>
  );
}

export default App;
