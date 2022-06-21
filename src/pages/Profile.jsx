import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    setProfileEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logoutBtn = (event) => {
    event.preventDefault();
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <h1 data-testid="profile-email">
        { profileEmail ? profileEmail.email : 'Email não informado' }
      </h1>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutBtn }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
