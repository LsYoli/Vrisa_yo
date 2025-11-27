import React from 'react';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Supabase Integration Example</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

export default App;
