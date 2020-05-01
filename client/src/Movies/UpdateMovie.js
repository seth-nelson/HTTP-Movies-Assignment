import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: []
};


const UpdateMovie = props => {

    const [ movie, setMovie ] = useState(initialMovie);

    const params = useParams();

    const handleChanges = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    //Don't make axios a useEffect. This is just for a data pull
    //Use this function to run a useEffect function seperately
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error('error getting movies for update', err));
    }, []);
    
    //Function to run a side effect when you get the current data
    // useEffect(() => {
    //     getMovies(params.id);
    // }, [params.id]);


    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(() => props.history.push('/'))
            .catch(err => console.error('error updating movie', err));
    };


    return (
        <div className='update-form-container'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={handleChanges}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={handleChanges}
                />
                <input 
                    type='text'
                    name='number'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                />
                <input 
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    value={movie.stars}
                    onChange={handleChanges}
                />
                <button type='submit'>Update Movie</button>
            </form>
        </div>
    );
};


export default UpdateMovie;