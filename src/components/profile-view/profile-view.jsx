import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [ user, setUser ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  // const favoriteMovies = movies.filter(() => {

  // });
  const removeFavorite = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://nightorbs-myflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${_id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const getUser = () => {

  };

  const handleSubmit = (e) => {
    e.preventDefaut();
    axios.put('https://nightorbs-myflix.herokuapp.com/users/${user.Username}', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      setUser(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error updating user information');
    });
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
            <h4>Your Info</h4>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={8}>
        <Card>
          <Card.Body>
            <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <h4>Update your info</h4>
            <label>Username:</label>
            <input type="text" name="Username" defaultValue={user.Username} onChange={e => handleUpdate(e)} />
            <label>Password:</label>
            <input type="password" name="Password" defaultValue={user.Password} onChange={e => handleUpdate(e)} />
            <label>Email:</label>
            <input type="email" name="Email" defaultValue={user.Email} onChange={e => handleUpdate(e)} />
          </Form>
          </Card.Body>
        </Card>
      </Col>


      {/* <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovies.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="favorite-movies">
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFavorite(_id)}>Remove from list</Button>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card> */}

    </Row>
  );
}