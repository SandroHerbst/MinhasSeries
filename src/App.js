import React from 'react'
import Header from './Header'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Genres from './Genres'
import NewGenre from './NewGenre'
import EditGenre from './EditGenre'
import Series from './Series'
import NewSerie from './NewSerie'
import InfoSerie from './InfoSerie'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/genres' exact component={Genres}/>
          <Route path='/genres/new' exact component={NewGenre}/>
          <Route path='/genres/:id' exact component={EditGenre}/>
          <Route path='/series' exact component={Series}/>
          <Route path='/series/new' exact component={NewSerie}/>
          <Route path='/series/:id' exact component={InfoSerie}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
