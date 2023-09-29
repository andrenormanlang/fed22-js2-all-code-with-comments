import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'
import { getRandomCatImageByBreed } from '../services/TheCatAPI'
import { Breed } from '../types/TheCatAPI.types'

const breeds: Breed[] = [
	{ id: '', name: 'Any' },
	{ id: 'ragd', name: 'Ragdoll' },
	{ id: 'sibe', name: 'Siberian' },
	{ id: 'beng', name: 'Bengal' },
	{ id: 'pers', name: 'Persian' },
	{ id: 'norw', name: 'Norwegian Forest' },
]

const RandomCatPage = () => {
	const [selectedBreed, setSelectedBreed] = useState('')  // ragd, sibe, beng, pers, norw
	// const { data, error, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)
	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat', selectedBreed],
		queryFn: () => getRandomCatImageByBreed(selectedBreed),
		// cacheTime: 7500,
	})

	if (error) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

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

export default RandomCatPage
