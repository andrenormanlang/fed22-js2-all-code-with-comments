// Johan´s solution!
import  { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom';
// import { searchByDate } from '../services/HackerNewsAPI'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import HN_ListItem from '../components/HN_ListItem'
import Pagination from '../components/Pagination';


const SearchHNPage = () => {
	const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState('');
	const [searchParams, setSearchParams] = useSearchParams()
	// const [query, setQuery] = useState("")

	// get 'query' from URL search params
	// const query = searchParams.get('query') || ""
	const query = searchParams.get('query') ?? ""

	// const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 0; // Get the page parameter


	const { data: searchResult, isError } = useQuery(
		['search-hn', { query, page }],
		() => HN_searchByDate(query, page),
		{
			enabled: !!query,
			keepPreviousData: true
		}
	)

	// const { data: searchResult, isError } = useQuery(
	// 	['search-hn', { query: query, page: page }],
	// 	searchByDate,
	// 	{
	// 		enabled: !!query,
	// 	}
	// )

	// console.log(data); X
	// console.log(searchResult); correct result

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// haxx0r
		if (!searchInput.trim().length) {
			return
		}

		// reset page state
		setPage(0)

		// set input value as query in searchParams
		// setSearchParams({ query: searchInput })    // ?query=tesla
		// setSearchParams({ query: searchInput, page: '0' }); // Reset page to 0
		setSearchParams({ query: searchInput }); // Reset page to 0
		// setQuery(searchInput)
	}

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{isError &&
				<Alert variant="warning">
					Oooops, something went wrong!
				</Alert>
			}

			{searchResult && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(searchResult.nbHits)} search results for "{searchInput}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map(hit => (
							<HN_ListItem
							key={hit.objectID}
							item={hit}
							/>
						))}
					</ListGroup>

					<Pagination
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
					/>

					{/* <Pagination
						page={page}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page >= 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => {
						setSearchParams({ query: query, page: (page - 1).toString() }); // Update the page in searchParams
						}}
						onNextPage={() => {
						setSearchParams({ query: query, page: (page + 1).toString() }); // Update the page in searchParams
						}}
					/> */}

				</div>
			)}
		</>
	)
}

export default SearchHNPage




// MY SOLUTION WITH DIFFERENT TYPES AND API!!
// import  { useState } from 'react';
// import { useQuery } from '@tanstack/react-query'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import ListGroup from 'react-bootstrap/ListGroup'
// import { search } from '../services/HackerNewsAPI'


// const SearchPage = () => {
// 	const [searchInput, setSearchInput] = useState('');
// 	const [queryKey, setQueryKey] = useState<string | null>(null);

// 	const { data: searchResult, error, isFetching, refetch } = useQuery(
// 		['search-news', queryKey],
// 		() => search(queryKey || ''),
// 		{
// 			enabled: queryKey !== null,
// 		}
// 	);

// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	const handleSubmit = (e:any) => {
// 		e.preventDefault();
// 		setQueryKey(searchInput);
// 	};

// 	return (
// 		<>
// 			<h1>🔎🔦👀</h1>

// 			<Form className="mb-4" onSubmit={handleSubmit}>
// 				<Form.Group className="mb-3" controlId="searchQuery">
// 					<Form.Label>Search Query</Form.Label>
// 					<Form.Control
// 						onChange={e => setSearchInput(e.target.value)}
// 						placeholder="Enter your search query"
// 						required
// 						type="text"
// 						value={searchInput}
// 					/>
// 				</Form.Group>

// 				<div className="d-flex justify-content-end">
// 					<Button
// 						variant="success"
// 						type="submit"
// 						disabled={isFetching}
// 						onClick={() => refetch()}
// 					>Search</Button>
// 				</div>
// 			</Form>

// 			{error && (
// 				<Alert variant="warning">
// 					{error instanceof Error ? error.message : 'An error occurred'}
// 				</Alert>
// 			)}

// 			{isFetching && <p>🤔 Loading...</p>}

// 			{searchResult && (
// 				<div id="search-result">
// 					<p>Showing {searchResult.nbHits} search results for "{searchInput}"...</p>

// 					<ListGroup className="mb-3">
// 						{searchResult.hits.map(hit => (
// 							<ListGroup.Item
// 								action
// 								href={hit.url}
// 								key={hit.objectID}
// 							>
// 								<h2 className="h3">{hit.title}</h2>
// 								<p className="text-muted small mb-0">
// 									{hit.points} points by {hit.author} at {hit.created_at}
// 								</p>
// 							</ListGroup.Item>
// 						))}
// 					</ListGroup>

// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default SearchPage



