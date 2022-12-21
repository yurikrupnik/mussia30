import styles from './App.module.css';
import { Routes, Route, Link } from "@solidjs/router"
import { lazy } from 'solid-js';

// import About from './routes/about';
// import Users from './routes/users';
// import Home from './routes/home';

const About = lazy(() => import('./routes/about'));
const Users = lazy(() => import('./routes/users'));
const Home = lazy(() => import('./routes/home'));

function App() {
  return (
    <div class={styles.App}>
      <h1 class="underline font-bold">Welcome frontend-host</h1>
      {/*<Button>my mui button</Button>*/}
      <nav>
        <Link href="/about">About</Link>
        <Link href="/user">Users</Link>
        <Link href="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/about" element={<About />} />
        {/*<Route path="/*all" element={<NotFound />} />*/}
      </Routes>
    </div>
  );
}

export default App;
