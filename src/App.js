import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React from 'react'
import Login from './components/Login'
import Home from './components/Home'


const app = () => (
        <div className="main-container">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        </div>
)


export default app