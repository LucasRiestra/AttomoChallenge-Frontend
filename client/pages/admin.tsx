// pages/admin.tsx
'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';
import Header from '../app/components/Header/Header';
import Footer from '../app/components/Footer/Footer';
import "../styles/globals.css";
import AdminSpace from '../app/components/AdminSpace/AdminSpace';


const Admin = () => {
  return (
    <div>
      <UserProvider>
      <Header />
      <br />
        <AdminSpace/>
      <Footer />
      </UserProvider>
    </div>
  );
};

export default Admin;