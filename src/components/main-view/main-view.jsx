import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  // constructor method creates the component
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Kung Fu Panda', Description: 'When the Valley of Peace is threatened, the lazy panda Po discovers his destiny as the "chosen one" and trains to become a Kung Fu hero, but transforming the unsleek slacker into a brave warrior won\'t be easy. It\'s up to Master Shifu and the Furious Five - Tigress, Crane, Mantis, Viper and Monkey - to give it a try.', ImagePath: 'https://www.themoviedb.org/t/p/w1280/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg' },
        { _id: 2, Title: 'Guardians of the Galaxy', Description: 'After stealing a mysterious orb in the far reaches of outer space, Peter Quill from Earth is now the main target of a manhunt led by the villain known as Ronan the Accuser. To help fight Ronan and his team and save the galaxy from his power, Quill creates a team of space heroes known as the "Guardians of the Galaxy" to save the galaxy.', ImagePath: 'https://www.themoviedb.org/t/p/w1280/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg' },
        { _id: 3, Title: 'Inception', Description: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.', ImagePath: 'https://www.themoviedb.org/t/p/w1280/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' }
      ],
      // by default no movie selected, so it shows movie list
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;
