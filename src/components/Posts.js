
import React from 'react'
import axios from 'axios'
import './Posts.css'
import PostsList from './PostsList'
import PostForm from './PostForm'
import FormErrors from './FormErrors'
import validations from './../validations'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import { config } from "./config";



class Posts extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      title: {value: '', valid: false},
      date:{value: '', valid: false},
      lead:'',
      content: {value: '', valid: false},
      image: '',
      formErrors: '',
      formValid: false
    }
  }

    static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    date: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    content: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
  }

     componentDidMount() {
    axios({
      method: 'GET',
      url: `${config.baseUrl}`,
      headers: {'X-Requested-With': 'XMLHttpRequest'}

    })
    .then(response => {
      this.setState({posts: response.data})
    })
  }

    validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if(!valid) {
        errors = errors.concat([fieldError])
      }
      return(errors);
    }, []);

    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }


validateForm() {
    this.setState({formValid: this.state.title.valid && this.state.content.valid && this.state.date.valid})
  }


   resetFormErrors () {
    this.setState({formErrors: {}})
  }


    handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, Posts.formValidations[name]))
  }



  handleSubmit = e => {
    e.preventDefault()
    let newPost = {
      title: this.state.title.value,
      date: this.state.date.value,
      category: this.state.category,
      content: this.state.content.value,
      image: this.state.image,
      lead: this.state.lead,
      image: this.state.image

    }
    axios({
      method: 'POST',
      url: `${config.baseUrl}/posts`,
      headers: JSON.parse(localStorage.user),
      data: { post: newPost}
    })
    .then(response => {
      this.addNewPost(response.data)
      this.resetFormErrors()
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data})
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
             <FormErrors formErrors = {this.state.formErrors} />
            <PostForm
              handleSubmit = {this.handleSubmit}
              handleInput = {this.handleInput}
              formValid={this.state.formValid}
              title= {this.state.title.value}
              date= {this.state.date.value}
              category= {this.state.category}
              content= {this.state.content.value}
              image= {this.state.image}
              lead= {this.state.lead}
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
