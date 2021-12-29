import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"

import AppHeader from './components/AppHeader'
import Posts from './components/Posts'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PostDetails from './components/PostDetails'
import PostForm from './components/PostForm'


function App() {
  const currentUser = localStorage.getItem('user')
  return (
    <Router>
    <AppHeader />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element= { currentUser ? <Navigate to="/" /> : <Login />}/>
        <Route path="/signup" element= { currentUser ? <Navigate to="/" /> : <SignUp />}/>
        <Route path="/posts/:id" element={<PostDetails /> }/>
        <Route path="/posts/:id/edit" element= { currentUser ? <PostForm />: <Navigate to="/login" />}/>
      </Routes>
    </Router>
  )
}

export default App;
