import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import './Posts.css'
import Row from 'react-bootstrap/Row'


const PostsList = props => (
    <Row>
      {props.posts.map(function(post){
        return(
          <Post key={post.id} post={post}/>
        )
      })}

    </Row>
)

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList

