import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from "antd";
import Login from './component/Login/Login'
import Signup from './component/Signup/Signup'
import HeaderBar from './component/HeaderBar/HeaderBar'
import Dashboard from './component/Dashboard/Dashboard'
import BoardGame from './component/BoardGame/BoardGame'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import { createBrowserHistory } from "history";


export const history = createBrowserHistory();



const isLoggedIn = () =>{
  return JSON.parse(localStorage.getItem('token'))=== null ? false: true; 
}


const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


class App extends Component {

  render(){
    return (
      <Router history={history} >
        <main className="App">
              <Layout>
                <HeaderBar></HeaderBar>
              </Layout>
              <br></br>
  
  
          <Switch>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/login" exact component={Login}></Route>
  
            <ProtectedRoute path="/" exact component={Dashboard}/> 
            <ProtectedRoute path="/game" exact component={BoardGame}/> 
  
          </Switch>
          
        </main>
      </Router>
    );
  }

}

export default  App;
