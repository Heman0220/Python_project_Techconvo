import React, { useEffect, useState } from 'react';
import './App.css';
import AssetManagement from './components/AssetManagement';
import SkillMatrix from './components/SkillMatrix';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from './components/Login';
import HomePage from './components/HomePage';
import Register from './components/Register';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser,login,logout,userData} from "./features/userSlice"
import {auth,db} from "./firebase"

function App() {
  const user = useSelector(selectUser);
  const dispatch=useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
        if(userAuth){
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
          }))
          db.collection('users')
            .where('email','==',userAuth.email)
            .get().then(querySnapshot =>  {
                const userInfo = {};
                querySnapshot.forEach(userDoc => {
                    userInfo.data=userDoc.data()
                })
                dispatch(userData(userInfo.data))
            }) 
        }else{
          dispatch(logout());
        }
      }
    )
    return unsubscribe;
  },[dispatch])
  return (
    <div className="app">
      <Router>
        {!user ? (
            <Switch>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/">
                <Login/>
              </Route>
            </Switch>
        ) : (
            <Switch>
              <Route path="/asset">
                <Header/>
                <AssetManagement/>
              </Route>
              <Route path="/skill">
                <Header/>
                <SkillMatrix/>
              </Route>
              <Route path="/">
                <Header/>
                <HomePage/>
              </Route>
          </Switch>
          )
        }
      </Router>
    </div>
  );
}

export default App;
