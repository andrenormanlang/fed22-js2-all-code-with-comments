import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Navigation from './pages/partials/Navigation';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import RandomCatPage from './pages/RandomCatPage';
import CatBreed from './pages/CatBreed';

import './assets/scss/App.scss';
import RandomCatImageBreed from './pages/RandomCatImageBreed';
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner';

const App = () => {
  return (
    <div id="App">
      <Navigation />

	  <GlobalFetchingSpinner />


      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/random-cat" element={<RandomCatPage />} />
          <Route path="/random-cat-breed" element={<CatBreed />} />
          <Route path="/random-image-of-breed" element={<RandomCatImageBreed />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
};

export default App;
