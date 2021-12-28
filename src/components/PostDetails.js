import {React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { config } from "./config";





const formatDate = datetime =>
  new Date(datetime).toDateString()

function PostDetails(props) {
   const {id} = useParams()

  const [post, setPost] = useState({})

  useEffect(() => {
    axios({
      method: "GET",
      url: `${config.baseUrl}/posts/${id}`,
      headers: JSON.parse(localStorage.getItem('user'))
    }).then((response) => {
      setPost(response.data)
    })
  }, [id])


     return (
    <div>
      <header className="headerimage" style={{backgroundImage: `url(${post.image})`}} />
      <Container className="content-container">
        <div className="post-details">
          <Row noGutters={true}>
            <Col xs={12} sm={12} md={8} lg={8}>
              {post.image && <img alt={post.title} className="post-image" src={post.image}/>}
            </Col>
            <Col xs={12} sm={12} md={4} className="bg-light">
              <div className="p-4">
                {post.currentUserCanEdit &&
                  <Button variant="outline-dark" href={`/posts/${id}/edit`} className="float-right">
                    Edit
                  </Button>
                }
                <p className="text-uppercase post-date-abbreviated">{moment(post.date).format('MMM')}</p>
                <p className="post-date-abbreviated">{moment(post.date).format('DD')}</p>
                <h1 className="pt-4 h5">{post.title}</h1>
                <div className="post-price">
                  <div className="text-muted">
                    Free
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row noGutters={true} className="post-register-button-container">
            <Col xs={12} sm={12} md={8} lg={8}>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="px-4">
                <Button  variant="success" size="lg" block><small>Register</small></Button>
              </div>
            </Col>
          </Row>


          <Row noGutters={true} className="post-description-container">
            <Col xs={12} sm={12} md={8} lg={8}>
              <h2 className="h4">Main text</h2>
              {post.content && <p className="lead" dangerouslySetInnerHTML={{__html: post.content}} />}
             </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className="p-4">
                <h3 className="h6">Last modification</h3>
                <div className="post-details__data">
                  <p>{moment(post.created_at || post.updated_at ).format('ddd, DD MMMM YYYY')}</p>
                </div>
                <h3 className="h6">Category</h3>
                <p>{post.category}</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )

  }


export default PostDetails
