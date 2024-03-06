// AdminGameList.tsx
'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './AdminGameList.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getUserByEmail } from '../../services/user.services';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  votes: Array<{ user: { name: string; id: string } }>;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  votes: Array<{ game: { id: string } }>;
  
}

const AdminGameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [formState, setFormState] = useState({ name: '', image: '', category: '' });

  useEffect(() => {
    const fetchGames = async () => {
      if (user?.email) {
        const fetchedUser = await getUserByEmail(user.email);
        setUserData(fetchedUser);
        try {
          const userGamesResponse = await axios.get<Game[]>(`${process.env.NEXT_PUBLIC_API_URL}/users/${fetchedUser.id}/games`);
          const allGamesResponse = await axios.get<Game[]>(`${process.env.NEXT_PUBLIC_API_URL}/games`);
          
          const userGameIds = new Set(userGamesResponse.data.map(game => game.id));
          const userGamesWithVotes = allGamesResponse.data.filter(game => userGameIds.has(game.id));
          
          setGames(userGamesWithVotes);
        } catch (error) {
          console.error('Error fetching games:', error);
        }
      }
    };
  
    fetchGames();
  }, [user]);

  const deleteGame = async (gameId: string) => {
    console.log('Deleting game with id:', gameId);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}`);
      setGames(games.filter(game => game.id !== gameId));
      toast.success('Game deleted successfully');
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('Error deleting game');
    }
  };

  const openModal = (game: Game) => {
    setCurrentGame(game);
    setFormState({ name: game.name, image: game.image, category: game.category });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSelectInputChange = (event: React.ChangeEvent<any>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const updateGame = async (id: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, formState);
      setGames(games.map(game => game.id === id ? { ...game, ...formState } : game));
      toast.success('Game updated successfully');
      closeModal();
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error('Error updating game');
    }
  };

  return (
    <div className='AdminGameList'>
      <div className='games-container'>
        {games.map((game) => {
          const votes = game.votes || [];
          return (
            <div key={game.id} className='game-card'>
              <img className="card-image" src={game.image} alt={game.name} />
              <div className='game-info'>
                <h2>{game.name}</h2>
                <h4>{game.category}</h4>
                <p>Votes: {votes.length}</p>
                <button className='update-button' onClick={() => openModal(game)}>Update</button>
                <button className='delete-button' onClick={() => deleteGame(game.id)}>Delete</button>
              </div>
            </div>
            
          );
        })}
      </div>

      <a href="/">
      <button className='button-go-home'>Go to Home Page</button>
      </a>
      
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formState.name} onChange={handleInputInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" name="image" value={formState.image} onChange={handleInputInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={formState.category} onChange={handleSelectInputChange}>
                <option value="">Select a category</option>
                <option value="Sport">Sport</option>
                <option value="Action">Action</option>
                <option value="Open-World">Open-World</option>
                <option value="Mobile">Mobile</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" onClick={() => currentGame && updateGame(currentGame.id)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminGameList;