import { useCallback, useEffect, useState } from "react"
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = <T = any>(initialUrl: string|null = null) => {
	const [data, setData] = useState<T|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [url, setUrl] = useState<string|null>(initialUrl)

	// const changeUrl = (url: string) => {
	// 	setData(null)
	// 	setUrl(url)
	// }

	const changeUrl = (_url: string) => {
		// validate that the `url` actually is a valid URL
		try {
			const url = new URL(_url)
			setUrl(url.toString())

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError("That's not a valid URL!")
			setIsError(true)
		}
	}


	// const getData = async () => {
	// 	const res= await axios.get<DogAPI_RandomImageResponse>('https://dog.ceo/api/breeds/image/random')
	// 	await new Promise(r => setTimeout(r, 3000))
	// 	setData(res.data) // or exclude <DogAPI_RandomImageResponse> and put in this line res.data as DogAPI_RandomImageResponse
	// }

	// const getData =useCallback(async (resourceUrl: string) => {
	// 	const res= await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
	// 	// await new Promise(r => setTimeout(r, 3000))
	// 	setData(res.data) // or exclude <DogAPI_RandomImageResponse> and put in this line res.data as DogAPI_RandomImageResponse
	// 	// setData(null) => another manner of doing it! setting the state to null afterwards
	// }, [url])

	const execute = () => {
		if (!url) {
			return
		}

		getData(url)
	}

	const getData =async (resourceUrl: string) => {
		// reset state
		setData(null)
		setError(null)
		setIsError(false)
		setIsLoading(true)

		// const res= await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
		// await new Promise(r => setTimeout(r, 3000))
		// setData(res.data) // or exclude <DogAPI_RandomImageResponse> and put in this line res.data as DogAPI_RandomImageResponse

		// setData(null) => another manner of doing it! setting the state to null afterwards

		try {
			// const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
			// await new Promise(r => setTimeout(r, 3000))
			const res = await axios.get<T>(resourceUrl)
			await new Promise(r => setTimeout(r, 3000))
			setData(res.data)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
			setIsError(true)
		}

		setIsLoading(false)
	}

	// getData() => Use useEffect

	// useEffect(() => {
	// 	if (!url){
	// 		return
	// 	}
	// 	console.log("Hello I am useEffect you have changed the URL") //Can only change the URL once per click
	// 	getData(url)
	// }, [url])

	// useEffect(() => {
	// 	if (!url){
	// 		return
	// 	}
	// 	console.log("Hello I am useEffect you have changed the URL") //Can only change the URL once per click
	// 	getData(url)
	// }, [getData])

	useEffect(() => {
		if (!url) {
			return
		}

		getData(url)
	}, [url])


	// if(!data){
	// 	return <p>Loading...</p>
	// }

	console.log('data:', data);

	// return {
	// 	changeUrl,
	// 	data,
	// setUrl,
	// }

	return {
		changeUrl,
		data,
		error,
		execute,
		isError,
		isLoading,
	}


}

export default useGetData

