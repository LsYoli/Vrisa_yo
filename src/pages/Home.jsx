import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>VRISA - Prototipo Universitario</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/app">
        <button>Go to App</button>
      </Link>
    </div>
  );
};

export default Home;
