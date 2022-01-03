import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import FormErrors from './FormErrors'
import './Posts.css'
import validations from './../validations'
import { config } from "./config";
import Container from 'react-bootstrap/Container'
import { useParams, useMatch, useNavigate} from "react-router-dom";

function withMatch(Component) {
  function WrappedComponent(props) {
    const { id } = useParams()
    const match = useMatch('/posts/:id/edit')
    const navigate = useNavigate()


    return <Component id={id} match={match} navigate={navigate} {...props} />;
  }

  return WrappedComponent;
}

class PostForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: {value: '', valid: false},
      date:{value: '', valid: false},
      lead:{value: '', valid: false},
      content: {value: '', valid: false},
      category: {value: '', valid: false},
      image: {value: '', valid: false},
      formErrors: {},
      formValid: false,
      editing: false,
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
    ],
    image: [],
    lead: [],
    category: []
  }

   componentDidMount() {
    if(this.props.match) {
    this.setState({editing: true})
    axios({
      method: 'GET',
      url: `${config.baseUrl}/posts/${this.props.id}`,
      headers: JSON.parse(localStorage.getItem('user'))
    })
    .then((response) => {

      this.setState({
        title: {valid: true, value: response.data.title},
        content: {valid: true, value: response.data.content},
        date: {valid: true, value: new Date(response.data.date).toDateString()},
        lead: {valid: true, value: response.data.lead},
        category: {valid: true, value: response.data.category},
        image: {valid: true, value: response.data.image},
        }, this.validateForm)
    });
  }
}


  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, PostForm.formValidations[name]))
  }

  handleSubmit = e => {
    e.preventDefault()

    const Post = {
      title: this.state.title.value,
      date: this.state.date.value,
      category: this.state.category.value,
      content: this.state.content.value,
      image: this.state.image.value,
      lead: this.state.lead.value

    }

    const method = this.state.editing? 'PUT' : 'POST'
    const url = this.state.editing ? `${config.baseUrl}/posts/${this.props.id}`: `${config.baseUrl}/posts`

    axios({
      method: method,
      url: url,
      headers: JSON.parse(localStorage.user),
      data: { post: Post}
    })
    .then(response => {
      if(!this.state.editing && this.props.onSuccess) {
        this.props.onSuccess(response.data)
      }
      this.resetFormErrors()
      this.props.navigate('/')
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data, formValid: false})
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

deleteEvent = () => {
    if(window.confirm("Are you sure you want to delete this event?")) {
      axios({
        method: 'DELETE',
        url: `${config.baseUrl}/posts/${this.props.id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      }).then((response) => {
        this.props.navigate('/')
      })
    }
  }

  render() {

    const {id} = this.props
    const match = this.props
    const navigate = this.props

      return (

      <Container className="container-max-width pt-5 my-5">

        <h4>{this.state.editing ? "Edit Post" : "Create a new Post"}</h4>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Title"  value={this.state.title.value} onChange={this.handleInput}/>
          <input type="text" name="date" placeholder="Date"  value={this.state.date.value} onChange={this.handleInput}/>
          <input type="text" name="category" placeholder="Category" value={this.state.category.value} onChange={this.handleInput} />
          <input type="text" name="content" placeholder="Content" value={this.state.content.value} onChange={this.handleInput}/>
          <input type="text" name="image" placeholder="image" value={this.state.image.value} onChange={this.handleInput}/>
          <input type="text" name="lead" placeholder="Lead"  value={this.state.lead.value} onChange={this.handleInput}/>
          <input type="submit" value={this.state.editing ? "Update Post" : "Create Post"}
           disabled={!this.state.formValid} />
        </form>
        {this.state.editing &&
        <p>
          <button onClick={this.deleteEvent}>Delete Event</button>
        </p>
      }
      </Container>
      )
    }

  }

PostForm.propTypes = {
  onSuccess: PropTypes.func,
}


export default withMatch(PostForm)
