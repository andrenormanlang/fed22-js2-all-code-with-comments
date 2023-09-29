import Image from 'react-bootstrap/Image'
import { useQuery } from '@tanstack/react-query';
import { Button, Alert } from 'react-bootstrap';
import { getCatBreedImage, getRandomCatBreed } from '../services/MeowAPI';


const RandomCatPage: React.FC = () => {
  const { data: randomCatBreed, error: breedsError, isFetching, refetch } = useQuery({
    queryKey: ['random-cat-breed'],
    queryFn: getRandomCatBreed,
  });

  const { data: breedImage, error: imageError } = useQuery({
    queryKey: ['cat-breed-image', randomCatBreed?.reference_image_id], // Update here
    queryFn: () => getCatBreedImage(randomCatBreed?.reference_image_id || ""),
    enabled: !!randomCatBreed?.reference_image_id,
  });

  if (breedsError || imageError) {
    return <Alert variant="error">Oops! Something went wrong.</Alert>;
  }

  return (
    <>
      <h1>I ❤️ Random Cat Breeds</h1>
      <p>Explore different cat breeds and their characteristics!</p>

      <div className="mb-3">
        <Button disabled={isFetching} onClick={() => refetch()} variant="primary">
          Get Another Cat Breed
        </Button>
      </div>



      {randomCatBreed && (
        <div>
			{breedImage && (
			<Image className='cat-image' src={breedImage} alt={randomCatBreed.name} fluid />
			)}
			<h2>{randomCatBreed.name}</h2>
			<p>{randomCatBreed.description}</p>
			<p>Temperament: {randomCatBreed.temperament}</p>
			<p>Origin: {randomCatBreed.origin}</p>

			{/* Add other properties you want to display */}
		</div>
		)}

    </>
  );
};

export default RandomCatPage;



