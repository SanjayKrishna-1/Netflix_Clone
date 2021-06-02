import React, {useEffect, useState} from 'react'
import axios from '../../axios'
import Youtube from 'react-youtube'
import {imageUrl, API_KEY} from '../../Constants/Constants'
import './RowPost.css'

function RowPost(props) {
	const [movies, setMovies] = useState([])
	const [urlId, setUrlId] = useState('')
	useEffect(() => {
		axios.get(props.url).then((response) => {
			console.log(response.data)
			setMovies(response.data.results)
		}).catch(err => {
			// alert("Network error!")
		})
	}, []);

	const opts = { 
		width: '100%', 
		height: '390',
		playerVars : {
			autoplay: 1,
		}
	}

	const handleMovie = (id) => {
		console.log(id);
		axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
			if (response.data.results.length !== 0) {
				setUrlId(response.data.results[0])
			} else {
				console.log("array empty");
			}
		})
	}

	return (
		<div className='row'>
			<h2>{props.title}</h2>
			<div className="posters">
				{movies.map((obj) =>
					<img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
				)}			
			</div>
			{ urlId && <Youtube opts={opts} videoId={urlId.key}/>}
		</div>
	)
}

export default RowPost
