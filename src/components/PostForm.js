import React from 'react'
import Post from './Post'

const PostForm = (props) => (
      <div>
        <h4>Create an Post:</h4>
        <form onSubmit={props.handleSubmit}>
          <input type="text" name="title" placeholder="Title"  value={props.title} onChange={props.handleInput}/>
          <input type="text" name="date" placeholder="Date"  value={props.date} onChange={props.handleInput}/>
          <input type="text" name="category" placeholder="Category" value={props.category} onChange={props.handleInput} />
          <input type="text" name="content" placeholder="Content" value={props.content} onChange={props.handleInput}/>
          <input type="text" name="image" placeholder="image" value={props.image} onChange={props.handleInput}/>
          <input type="text" name="lead" placeholder="Lead"  value={props.lead} onChange={props.handleInput}/>
          <input type="text" name="hashtag" placeholder="Hashtag" multiple="true" value={props.hashtag} onChange={props.handleInput} />
          <button type="submit">Create Post</button>
        </form>
      </div>
    )


export default PostForm
