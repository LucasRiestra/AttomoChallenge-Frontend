'use client'

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { createUser, getUserByEmail } from '../../services/user.services';
import "./Header.css";
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


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

  const handleAdminClick = () => {
    if (!user) {
      toast.error('You need to login to access the admin space.');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <header className='Header'>
      <Link href="/"><h1 className='app-title'>GameVote</h1></Link>
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
        </>
      ) : (
        <Link href="/api/auth/login">
          <button>
            Login
          </button>
        </Link>
        
      )}
      <button onClick={handleAdminClick}>Admin Space</button>
      <Toaster />
      
    </header>
  );
}