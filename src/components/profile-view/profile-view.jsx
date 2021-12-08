import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [ user, setUser ] = useState({

  });

  const favoriteMovies = movies.filter((movies) => {

  });

  const getUser = () => {

  };

  const handleSubmit = (e) => {

  };

  const removeFavorite = (id) => {

  };

  const handleUpdate = (e) => {

  };

  useEffect(() => {

  }, [])

  return (
    <Row>
      <Col xs={12} sm={4}>
        <Card>
          <Card.Body>
            <UserInfo name={user.Username} email={user.Email} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={8}>
        <Card>
          <Card.Body>
            <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
          </Card.Body>
        </Card>
      </Col>


      <FavoriteMovies favoriteMovies={favoriteMovies} />

    </Row>
  );
}