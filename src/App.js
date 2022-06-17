import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';
import About from './components/About';
import Login from './pages/login';
import AddSubscriber from './pages/AddSubscriber';
import EditSubscriber from './pages/EditSubscriber';
import Header from './components/Header';
import SubscriberProvider from './context/subscriberContext'

function App() {
  return (
    <SubscriberProvider>
    <Router>
      <Header/>
      <Routes>
                 <Route exact path='/' element={< Welcome />}></Route>
                 <Route exact path='/about' element={< About />}></Route>
                 <Route exact path='/login' element={< Login />}></Route>
                 <Route exact path='/subscriber/add' element={< AddSubscriber />}></Route>
                 <Route path='/subscriber/edit/:id' element={< EditSubscriber />}></Route>
      </Routes>
    </Router>
    </SubscriberProvider>  
  );
}

export default App;