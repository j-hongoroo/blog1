import CreatePost from './components/createPost/createpost';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import { Navbar } from './components/navbar/header';
import Login from './components/login/login';
import Register from './components/register/register';
import { Home } from './components/home/home';
import { PostDetails } from './components/postDetails/postDetail';
import { useState } from 'react';
import { UserContext } from './components/context/userContext';
import Mypost from './components/myPosts/myPosts';
import Edit from './components/edit/edit';

function App() {
const [token,setToken]=useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{token,setToken}}>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/CreatePost' element={<CreatePost/>}/>
            <Route exact path='/Login' element={<Login/>}/>
            <Route exact path='/Register' element={<Register/>}/>
            <Route exact path='/post/:id' element={<PostDetails/>}/>
            <Route exact path='/Mypost' element={<Mypost/>}/>
            <Route exact path='/post/:id/edit' element={<Edit/>}/>
            <Route exact path='/Mypost/post/:id' element={<PostDetails/>}/>

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
