import {useIsFetching} from '@tanstack/react-query'

const GlobalFetchingSpinner = () => {
	const isFetching = useIsFetching()

	return isFetching
	?(
		<div id="cat-spinner">
			<div className="cat">🐱</div>
		</div>
	) : null

// 	if(!isFetching) return null
// 	else return <div id="cat-spinner">
// 	<div className="cat">🐱</div>
// </div>
}

export default GlobalFetchingSpinner
