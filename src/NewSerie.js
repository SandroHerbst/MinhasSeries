import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
    const [form, setForm] = useState({
        name: ''
    })    
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
            })
    }, [])

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }    

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })        
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    
    const save = () => {
        axios.post('/api/series',{
            ...form,
            genre_id: genreId
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success) {
        return <Redirect to='/series'/>
    }
    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série'/>
                </div>            
                <div className='form-group'>
                    <label htmlFor='genre_id'>Gênero</label>
                    <select className='form-control' id='genre_id' onChange={onChangeGenre} value={genreId}>
                        { genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>) }
                    </select>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' checked={form.status === 'WHATCHED'} name='status' onChange={seleciona('WHATCHED')} id='WHATCHED' value='WHATCHED'/>
                    <label className='form-check-label' htmlFor='WHATCHED'>Assistido</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' checked={form.status === 'TO_WATCH'} name='status' onChange={seleciona('TO_WATCH')} id='TO_WATCH' value='TO_WATCH'/>
                    <label className='form-check-label' htmlFor='TO_WATCH'>Para assistir</label>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NewSerie