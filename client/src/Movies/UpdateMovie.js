import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};


const UpdateMovie = props => {

    const [ movie, setMovie ] = useState(initialMovie);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error('error getting movies for update', err));
    }, [id]);

    const handleChanges = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const submitForm = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then( res => setMovie(initialMovie))
                props.history.push('/')
            .catch(err => console.error('error updating movie', err));
    };


    return (
        <div className='update-form-container'>
            <form onSubmit={submitForm}>
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