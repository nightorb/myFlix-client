import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Figure, Button, Card } from 'react-bootstrap';

function FavoriteMovies({ favoriteMovies }) {
  const removeFavorite = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://nightorbs-myflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return (
    <Card>
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
    </Card>
  );
}

export default FavoriteMovies;
