import Link from 'next/link';
import "./Header.css";

export default function Header() {
  return (
    <header className='Header'>
      <h1>GameVote</h1>
      <Link href="/api/auth/login">
        <button>
          Login
        </button>
      </Link>
    </header>
  );
}