import React from 'react';
import ClaudeChefLogo from './assets/a8a4b5e0a54b167a0c7a3a68ecd4597a20b4f005.png';



export default function Header() {
  return (
    <header className="header">
          <img src={ClaudeChefLogo} alt="ClaudeChef Logo" className="logo" />
          <h1>ChefClaude</h1>
    </header>
  );
}