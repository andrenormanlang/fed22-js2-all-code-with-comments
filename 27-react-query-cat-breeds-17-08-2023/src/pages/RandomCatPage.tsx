import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import { getRandomCat } from '../services/MeowAPI'
import { Button } from 'react-bootstrap'

const RandomCatPage = () => {
	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCat,
	})

	if (error) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>A cat's behavior is random so here's a random cat for you! Such random, very catlike, much hairball</p>

			<div className="mb-3">
				<Button
					disabled={isFetching}
					onClick={() => refetch()}
					variant="primary"
				>
					MJAU CATS!!!
				</Button>
			</div>

			<div style={{ position: 'relative' }}>


				{data && (
					<Image src={data.url} fluid />
				)}
			</div>
		</>
	)
}

export default RandomCatPage

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
