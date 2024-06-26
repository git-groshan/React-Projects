// import logo from './logo.svg';
import './App.css';


// React class based component 
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
//   Router,
// } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for react router 

export default class App extends Component {
  pageSize=15;
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0

  }
  // const [progress, setProgress] = useState(0); // can't use this as we are using class based component 
  setProgress = (progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (
          <Router>
      <div>
          <NavBar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
            <Routes>

            
                                          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'general' pageSize={this.pageSize} country="in" category="general"/>} > </Route>
                                          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'general' pageSize={this.pageSize} country="in" category="general"/>} > </Route>
                                          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'business' pageSize={this.pageSize} country="in" category="business"/>} > </Route>
                                          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'science' pageSize={this.pageSize} country="in" category="science"/>} > </Route>
                                          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'technology' pageSize={this.pageSize} country="in" category="technology"/>} > </Route>
                                          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'health' pageSize={this.pageSize} country="in" category="health"/>} ></Route>
                                          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'sports' pageSize={this.pageSize} country="in" category="sports"/>} ></Route>
                                          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key= 'entertainment' pageSize={this.pageSize} country="in" category="entertainment"/>} > </Route>
                                          
            </Routes>


          {/* <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science"/> */}
      </div>
          </Router>
    )
  }
}



/*

// fucntion based component 
function App() {
  return (
    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
    Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
    >
    Learn React
    </a>
    </header>
    </div>
  );
}

export default App;
*/
