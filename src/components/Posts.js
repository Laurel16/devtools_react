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
      url: `${config.baseUrl}`
    })
    .then(response => {
      this.setState({posts: response.data})
    })
  }


   handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const newState = {}
    newState[name] = e.target.value
    this.setState(newState)

  }

  handleSubmit = e => {
    e.preventDefault()
    let newPost = {
      title: this.state.title,
      date: this.state.date,
      category: this.state.category,
      content: this.state.content,
      image: this.state.image,
      lead: this.state.lead,
      hashtag: this.state.hashtag

    }
    axios({
      method: 'POST',
      url: `${config.baseUrl}/posts`,
      headers: JSON.parse(localStorage.user),
      data: { post: newPost}
    })
    .then(response => {
      this.addNewPost(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }


    addNewPost= (post) => {
    const posts = [...this.state.posts, post].sort(function(a,b){
      return new Date(a.date) - new Date(b.date)
    })

    this.setState({posts: posts})
    console.log(posts)
  }
  render() {
    const currentUser = localStorage.getItem('user')
    return (
      <Container className="container-max-width pt-5 my-5">

           {currentUser &&
             <div className="mb-5 event-form-homepage-container">
            <PostForm
              handleSubmit = {this.handleSubmit}
              handleInput = {this.handleInput}
              title= {this.state.title}
              date= {this.state.date}
              category= {this.state.category}
              content= {this.state.content}
              image= {this.state.image}
              lead= {this.state.lead}
              hashtag= {this.state.hashtag}
            />
            </div>
             }
             <h1 className="h4">Latest posts</h1>
            <PostsList posts={this.state.posts} />

       </Container>
        )

      }
    }


export default Posts
