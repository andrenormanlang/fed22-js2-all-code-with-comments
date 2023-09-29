import { useEffect, useState } from "react"
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string|null = null )  =>{
	const [data, setData] = useState<DogAPI_RandomImageResponse|null>(null)
	const [url, setUrl] = useState<string|null>(initialUrl)

	// const getData = async () => {
	// 	const res= await axios.get<DogAPI_RandomImageResponse>('https://dog.ceo/api/breeds/image/random')
	// 	await new Promise(r => setTimeout(r, 3000))
	// 	setData(res.data) // or exclude <DogAPI_RandomImageResponse> and put in this line res.data as DogAPI_RandomImageResponse
	// }

	const getData = async (resourceUrl: string) => {
		const res= await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
		// await new Promise(r => setTimeout(r, 3000))
		setData(res.data) // or exclude <DogAPI_RandomImageResponse> and put in this line res.data as DogAPI_RandomImageResponse
	}

	// getData() => Use useEffect

	useEffect(() => {
		if (!url){
			return
		}
		console.log("Hello I am useEffect you have changed the URL") //Can only change the URL once per click
		getData(url)
	}, [url])

	// if(!data){
	// 	return <p>Loading...</p>
	// }

	console.log('data:', data);

	return{
		data,
		setUrl,
	}


}

export default useGetData

