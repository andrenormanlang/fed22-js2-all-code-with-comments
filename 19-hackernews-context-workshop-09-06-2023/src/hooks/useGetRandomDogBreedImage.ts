import { DogAPI_RandomImageResponse } from "../types"
import useGetData from "./useGetData"

const useGetRandomDogBreedImage = (breed: string) => {
	return useGetData<DogAPI_RandomImageResponse>(`https://dog.ceo/api/breed/${breed}/images/random`)
}

export default useGetRandomDogBreedImage
