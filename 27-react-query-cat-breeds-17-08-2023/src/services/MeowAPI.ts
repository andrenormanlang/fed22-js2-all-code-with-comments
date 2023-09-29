/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */

import axios from 'axios'
import { CatBreedListResponse, CatImage, ImageSearchResponse } from '../types/TheCatAPI.types'

const FAKE_DELAY = 1500

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1/",
	timeout: 10000,
})

/**
 * Execute a GET request
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)

	// Simulate a delay
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))

	return response.data
}

/**
 * Get a random cat image
 */
export const getRandomCat = async () => {
	const data = await get<ImageSearchResponse>("images/search")

	return data[0]

}


/**
 * Get a random cat by breed
 *
 * @param {string} breed_id The breed ID to get
 * @returns {Promise<Cat>} A random cat
 *
 */
export const getRandomCatImageByBreed = async (breed_id = '') => {
	const data = await get<ImageSearchResponse>("images/search?breed_ids=" + breed_id)

	// https://api.thecatapi.com/v1/images/search?breed_ids=beng
	//

	return data[0]
}


/**
 * Get random cat images
 */
export const getRandomCatImages = async (qty = 1) => {
	const data = await get<ImageSearchResponse>("images/search?limit=" + qty)

	return data
}


export const getRandomCatBreed = async () => {
	const data = await get<CatBreedListResponse>("breeds");
	const randomIndex = Math.floor(Math.random() * data.length);
	return data[randomIndex];
  };


export const getCatBreedImage = async (imageId: string) => {
	const imageResponse = await get<CatImage>(`images/${imageId}`);
	return imageResponse.url;
};


// https



/**
 * Get random cat images
 */
// export const getRandomCatImages = async (qty = 1) => {
// 	const data = await get<ImageSearchResponse>("images/search?limit=" + qty)

// 	return data
// }



// OWN SOLUTION!!
// import axios from "axios";

// const FAKE_DELAY = 2500

// const instance = axios.create({
// 	baseURL: "https://api.thecatapi.com/v1/images/search/",
// 	headers: {
// 		baseURL: "https://api.thecatapi/v1/",
// 		timeout: 10000, //time for giving an error
// 		"Content-Type": "application/json",
// 		Accept: "application/json",
// 	},
//   });

//   const get = async () => {
// 	try {
// 		const response = await instance.get("", {
// 			timeout: 3000, // Set the timeout to 3 seconds (3000 milliseconds)
// 		});
// 		return response.data[0];
// 	} catch (error) {
// 		// Handle the error here
// 		console.error("Error fetching data:", error);
// 		throw error; // Rethrow the error to handle it at a higher level
// 	}
//   };

//   export const getRandomCat = async () => {
// 	return get()
//   };

