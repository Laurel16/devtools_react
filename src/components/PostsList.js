import React from 'react'
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

export default PostsList

