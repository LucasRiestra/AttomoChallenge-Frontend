'use client'

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { createUser, getUserByEmail } from '../../../services/user.services';
import "./Header.css";

export default function Header() {
  const { user, isLoading } = useUser();
  const [localUser, setLocalUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        console.log('Auth0 user:', user);
        const dataFetched = await getUserByEmail(user.email);
        if (dataFetched) {
          setLocalUser(dataFetched); 
        } else {
          const newUserResponse = await createUser({ name: user.name, email: user.email, password: user.name });
          if (newUserResponse) {
            setLocalUser(newUserResponse); 
          }
        }
      }
    };
  
    fetchUser();
  }, [user]);

  console.log('Local user:', localUser);

  return (
    <header className='Header'>
      <h1>GameVote</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : user && localUser ? (
        <>
          <div>Welcome, {localUser?.name}</div>
          <Link href="/api/auth/logout">
            <button>
              Logout
            </button>
          </Link>
          
            <h1>Admin Space</h1>
          
        </>
      ) : (
        <Link href="/api/auth/login">
          <button>
            Login
          </button>
        </Link>
        
      )}<h1>Admin Space</h1>
    </header>
  );
}