import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { memesCol, storage } from '../services/firebase'
import useAuth from './useAuth'

const useUploadMeme = () => {
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState<boolean | null>(null)
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
	const [isUploading, setIsUploading] = useState<boolean | null>(null)
	const [progress, setProgress] = useState<number | null>(null)
	const { currentUser } = useAuth()

	const upload = async (image: File) => {
		// reset internal state
		setError(null)
		setIsError(null)
		setIsSuccess(null)
		setIsUploading(true)
		setProgress(null)

		try {
			// generate a uuid for the file
			const uuid = uuidv4()  // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"

			// find file extension
			const ext = image.name.substring( image.name.lastIndexOf(".") + 1 )  // "png"

			// construct filename to save image as
			const storageFilename = `${uuid}.${ext}`  // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png"

			// create reference to the file in storage
			const storageRef = ref(storage, `memes/${storageFilename}`)

			// start upload of image
			const uploadTask = uploadBytesResumable(storageRef, image)

			// attach upload observer
			uploadTask.on("state_changed", snapshot => {
				// update progress
				setProgress(
					Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 1000
					) / 10
				)
			})

			// wait for upload to complete
			await uploadTask.then()

			// get download url to uploaded image
			const url = await getDownloadURL(storageRef)

			// create document in db-collection "memes"
			const docRef = doc(memesCol)

			// create document in db for the uploaded image
			await setDoc(docRef, {
				_id: docRef.id,
				created: serverTimestamp(),
				name: image.name,
				path: storageRef.fullPath,
				size: image.size,
				type: image.type,
				uid: currentUser?.uid,
				url: url,
			})

			// profit 💰
			setIsSuccess(true)
			setIsUploading(false)


		} catch (err) {
			console.log("Something went wrong with the upload", err)
			if (err instanceof Error){
				setError(err.message)
			} else{
				setError("DANGER WILL ROBINSON! 🤖")
			}
		} finally{
			setIsUploading(false)
		}
	}

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
	}
}

export default useUploadMeme




// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
// import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import { storage } from '../services/firebase'

// const useUploadMeme = () => {

// 	const [error, setError ] = useState <string | null>(null)
// 	const [isError, setIsError ] = useState <string | null>(null)
// 	const [isSuccess, setIsSuccess] = useState <string | null>(null)
// 	const [isUploading, setIsUploading ] = useState <string | null>(null)
// 	const [progress, setProgress ] = useState <string | null>(null)
// 	// error
// 	// isError
// 	// isSuccess
// 	// isUploading
// 	// progress

// 	const upload = async (image:File) =>{
// 		// Date.now() + "-" + image.name // "lolcat.gif"   "1694778216492-lolcat.gif"
// 		setError(null)
// 		setIsError(null)
// 		setIsSuccess(null)
// 		setIsUploading(null)
// 		setProgress(null)

// 		//  reset internal state

// 		try {
// 			// generate a uuid for the file
// 			const uuid = uuidv4()  // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"

// 			// find file extension
// 			const ext = image.name.substring( image.name.lastIndexOf(".") + 1 )  // "png"

// 			// construct filename to save image as
// 			const storageFilename = `${uuid}.${ext}`  // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png"

// 			// create reference to the file in storage
// 			const storageRef = ref(storage, `memes/${storageFilename}`)

// 			// start upload of image
// 			const uploadTask = uploadBytesResumable(storageRef, image)

// 			// attach upload observer
// 			uploadTask.on("state_changed", snapshot => {
// 				// update progress
// 				setProgress(
// 					Math.round(
// 						(snapshot.bytesTransferred / snapshot.totalBytes) * 1000
// 					) / 10
// 				)
// 			})

// 			// wait for upload to complete
// 			await uploadTask.then()

// 			// get download url to uploaded image
// 			const url = getDownloadURL(storageRef)


// 			// create reference to db-collection "memes"

// 			// create document in db for the upload image

// 			//  profit 🤑


// 		} catch (err) {
// 			console.log("Something went wrong with the upload", err)
// 		}
// 	}


// 	return {
// 		error,
// 		isError,
// 		isSuccess,
// 		isUploading,
// 		progress,
// 		upload,
// 	}
// }

// export default useUploadMeme;
