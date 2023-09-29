/**
 * The Cat API Types
 */

export type Cat = {
	id: string
	url: string
	width: number
	height: number
}

export type ImageSearchResponse = Cat[]

export type CatBreed = {
	id: string;
	name: string;
	description: string;
	temperament: string;
	origin: string;
	reference_image_id: string;

};

export type CatBreedListResponse = CatBreed[];

export type CatImage = {
	id: string;
	url: string;
	width: number;
	height: number;
};

export type Breed = {
	id: string
	name: string
}
