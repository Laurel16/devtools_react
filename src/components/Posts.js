
import React from 'react'
import axios from 'axios'
import './Posts.css'
import PostsList from './PostsList'
import PostForm from './PostForm'
import Container from 'react-bootstrap/Container'
import { config } from "./config";



class Posts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: `${config.baseUrl}/posts`
    })
    .then(response => {
      this.setState({posts: response.data})
    })
  }


  addNewPost= (post) => {
    const posts = [...this.state.posts, post].sort(function(a,b){
      return new Date(a.date) - new Date(b.date)
    })

    this.setState({posts: posts})
  }
  render() {
    const currentUser = localStorage.getItem('user')
    return (
      <Container className="container-max-width pt-5 my-5">

        {currentUser &&
             <PostForm onSuccess={this.addNewEvent}/>
             }

        <h1 className="h4">Latest posts</h1>
          <PostsList posts={this.state.posts} />

       </Container>
        )
      }

    }


export default Posts
