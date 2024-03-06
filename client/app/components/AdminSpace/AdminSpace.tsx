// components/AdminSpace.tsx

'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getUserByEmail } from '../../services/user.services';
import './AdminSpace.css';
import "../../../styles/globals.css";
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
}

const AdminSpace = () => {
  const { user, isLoading } = useUser();
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); 
  const [category, setCategory] = useState('');
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        const fetchedUser = await getUserByEmail(user.email);
        console.log('Fetched user:', fetchedUser); 
        setUserData(fetchedUser);
      }
    };
  
    fetchUser();
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userData || !image) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image); 
    formData.append('category', category);
    formData.append('userId', userData.id);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/games`, formData);
      console.log(response.data);
      toast.success('Game created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the game.');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value); 
  };

  return (
    <div className='container'>
      <div className='form-container'>
      <h1>Add Game to Vote</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Image:
          <input type="text" value={image} onChange={handleImageChange} placeholder='url of image' required />
        </label>
        <label>
          Genre:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a genre</option>
            <option value="Sports">Sports</option>
            <option value="Action">Action</option>
            <option value="Open-World">Open-World</option>
            <option value="Mobile">Mobile</option>
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
      </div>
    </div>
  );
};

export default AdminSpace;