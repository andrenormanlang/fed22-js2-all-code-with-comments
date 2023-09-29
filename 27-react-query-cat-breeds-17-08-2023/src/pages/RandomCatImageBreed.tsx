import { useQuery } from '@tanstack/react-query'
import {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import { getRandomCatImageByBreed } from '../services/MeowAPI'
import { Button, ButtonGroup } from 'react-bootstrap'

import { Breed } from '../types/TheCatAPI.types'

// const breed = 'ragd'

const breeds: Breed[] = [
	{ id: '', name: 'Any' },
	{ id: 'ragd', name: 'Ragdoll' },
	{ id: 'sibe', name: 'Siberian' },
	{ id: 'beng', name: 'Bengal' },
	{ id: 'pers', name: 'Persian' },
	{ id: 'norw', name: 'Norwegian Forest' },
]

const RandomCatImageBreed = () => {
	const [selectedBreed, setSelectedBreed] = useState('')  // ragd, sibe, beng, pers, norw
	// const { data, error, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)
	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat', selectedBreed],
		queryFn: () => getRandomCatImageByBreed(selectedBreed),
		cacheTime: 7500,
	})

	if (error) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

	// const imageQuery = useQuery({
	// 	queryKey: ['random-cat', selectedBreed],
	// 	queryFn: () => getRandomCatImageByBreed(selectedBreed),
	// 	cacheTime: 7500,
	// })

	// const breedQuery = useQuery({
	// 	queryKey: ['breed-info', selectedBreed],
	// 	queryFn: () => getBreedInfo(selectedBreed),
	// })

	// if (imageQuery.error || breedQuery.error) {
	// 	return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	// }

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball</p>



			<div className="text-center">
				<div className="mb-3">
					<Button
						disabled={isFetching}
						onClick={() => refetch()}
						variant="primary"
					>
						MJAU CATS!!!
					</Button>

					<ButtonGroup className="ms-2">
						{breeds.map(breed => (
							<Button
								key={breed.id}
								disabled={isFetching || selectedBreed === breed.id}
								onClick={() => setSelectedBreed(breed.id)}
								// onClick={() => { /* OVERPASSES THE STALE TIME! */
								// 	selectedBreed === breed.id
								// 		? refetch()
								// 		: setSelectedBreed(breed.id)
								// }}
								variant="secondary"
							>
								{breed.name}
							</Button>
						))}
					</ButtonGroup>
				</div>
				{data && (
					<Image src={data.url} fluid />
				)}
			</div>
		</>
	)
}


export default RandomCatImageBreed

// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getRandomCat } from "../services/MeowAPI";
// import { RandomCat } from "../services/types/TheCatAPI.types";
// import Spinner from "../components/Spinner";

// const RandomCatPage = () => {
//   const { data: randomCat, isLoading, isError } = useQuery<RandomCat>(
//     ["randomCat"],
//     getRandomCat
//   );
// //   const { data: randomCat, isLoading, isError } = useQuery<RandomCat>(
// //     ["bengal","randomCat"], // getting a cat of a specific race
// //     getRandomCat
// //   );

//   const refetchRandomCat = useMutation(getRandomCat, {
//     onSuccess: () => {
//     // Reload the page to fetch and display a new random cat
//       window.location.reload();
//     },
//   });

//   return (
//     <div className="container mt-5">
//       <h1>Random Cat Page</h1>
//       {isLoading ? (
//         <Spinner />
//       ) : isError ? (
//         <p>Error fetching cat data.</p>
//       ) : (
//         <div className="card justify-content-center">
// 			<div className="card-body">
//             <button
// 				className="btn btn-primary"
// 				onClick={() => refetchRandomCat.mutate()}
// 				disabled={refetchRandomCat.isLoading}
// 				style={{width:'' }}
// 			>
//               {refetchRandomCat.isLoading ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                     aria-hidden="true"
//                   />
//                   <span className="visually-hidden">Loading...</span>
//                 </>
//               ) : (
//                 "Get New Cat"
//               )}
//             </button>
//           </div>
//           <img
//             src={randomCat?.url}
//             alt="Random Cat"
//             className="card-img-top img-fluid" // Add the img-fluid class for responsiveness
//             style={{ }} // Set max height to 70% of viewport height
//           />

//         </div>
//       )}
//     </div>
//   );
// };

// export default RandomCatPage;
