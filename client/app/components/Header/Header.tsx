import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import "./Header.css";

export default function Header() {
  

  return (
    <header className='Header'>
      <h1>GameVote</h1>

        <button>
            Login
        </button>
    </header>
  );
}