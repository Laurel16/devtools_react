import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Posts.css'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import moment from 'moment'


const Post = props => (
  <Col md={4} className="py-3">
    <a href={`/posts/${props.post.id}`} className="post-card-link">
      <Card className="h-100 mb-4 post-card">
        <Card.Img variant="top" src={props.post.image} />
        <Card.Body>
          <Card.Text className="post-card-date">
            {moment(props.post.date).format('ddd, MMM DD, YYYY')}
          </Card.Text>
          <Card.Title>
            {props.post.title}
          </Card.Title>
           <Card.Text>
           {props.post.lead}
            </Card.Text>
        </Card.Body>
      </Card>
    </a>
  </Col>
)

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired
  })
}

export default Post

