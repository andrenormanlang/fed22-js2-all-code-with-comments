/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from 'axios'
import { HN_SearchResponse } from '../types/HackerNewsAPI.types'

const FAKE_DELAY = 500

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://hn.algolia.com/api/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)

	// Simulate a delay
	!!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

	return response.data as T
}

/**
 * Search Hacker News stories
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const search = async (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search?query=${query}&tags=story&page=${page}`)
}


/**
 * Search Hacker News stories by date
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchByDate = async (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`)
}


/**
 * DIFFERENT BUT NOT ADVISABLE WAY OF QUERYING PAGES
 * Search Hacker News stories by date
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
*/

// type SearchByDateQueryKey = readonly [string, { query: string, page: number }]

// export const searchByDate = async ({ queryKey }: { queryKey: SearchByDateQueryKey }) => {
// 	const { query, page } = queryKey[1]
// 	return get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`)
// }



// API FOR MY SOLUTION FOR WORKSHOP 17-08-2023!!
/**
 * Search Hacker News stories
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
// export const search = async (query: string) => {
// 	return get<HN_SearchResponse>(`/search?query=${query}`)
// }
