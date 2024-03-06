'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';
import Header from '../app/components/Header/Header';
import Footer from '../app/components/Footer/Footer';
import "../styles/globals.css";
import FormAdminSpace from '../app/components/FormAdminSpace/FormAdminSpace';
import AdminGameList from '../app/components/AdminGameList/AdminGameList';



const Admin = () => {
  return (
    <div>
      <UserProvider>
      <Header />
      <br />
        <FormAdminSpace/>
        <AdminGameList />
      <Footer />
      </UserProvider>
    </div>
  );
};

export default Admin;