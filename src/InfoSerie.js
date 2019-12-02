import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [data, setData] = useState({})
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        if(match.params.id)
        {        
            axios
                .get('/api/series/'+ match.params.id)
                .then(res => {
                    setData(res.data)
                    setForm(res.data)
                })
        }
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const found = genres.find(value => data.genre === value.name)
                if (found) {
                    setGenreId(found.id)
                }                
            })
    }, [data])

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })        
    }

    const save = () => {
        axios.put('/api/series/' + match.params.id, {
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
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3 mt-2 mb-2'>
                                <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name}/>
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'WHATCHED' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'TO_WATCH' && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {
                mode === 'INFO' &&
                <div className='container'>
                    <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
                </div>
            }
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Editar Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série'/>
                        </div>            
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentários</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comentários'/>
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
            }
        </div>
    )
}

export default InfoSerie