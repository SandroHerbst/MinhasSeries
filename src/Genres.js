import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Genres = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const renderizeLine = record => {
        return(
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteRecord(record.id)}>Remover</button>
                    <Link to={'/genres/' + record.id} className='btn btn-warning'>Editar</Link>
                </td>
            </tr>            
        )
    }

    const deleteRecord = id => {
        //console.log(id)
        axios
            .delete('/api/genres/' + id)
            .then(res => {
                //console.log(res)
                const filter = data.filter(item => item.id !== id)
                setData(filter)
            })
    }

    if (data.length === 0) {
        return(
            <div className='container'>
                <h1>Gêneros</h1>
                <div className='alert alert-warning' role='alert'>
                    Você não possui gêneros criados.
                </div>
                <Link to='/genres/new' className='btn btn-primary'>Novo gênero</Link>
            </div>
        )
    }

    //const id = 2
    //const filter = data.filter(item => item.id !== id)

    //console.log(filter)

    return (
        <div className='container'>
            <h1>Gêneros</h1>

            <Link to='/genres/new' className='btn btn-primary'>Novo gênero</Link>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizeLine)}
                </tbody>            
            </table>
        </div>
    )
  }

export default Genres