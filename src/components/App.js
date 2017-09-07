import React, { Component } from 'react';
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'
import { fetchCategories, fetchPosts } from '../actions'
import CategoryBock from './CategoryBlock'

class App extends Component {


  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  countPostComments = postId => {
    //console.log('postId: ' + postId)
    //console.log('comments: ' + JSON.stringify(this.props.comments))

    let counter = this.props.comments.filter(c => c.parentId === postId)
      .reduce((accumulator, currentValue) => {
        //console.log('currentValue: ' + currentValue.id)
        //console.log('accumulator: ' + accumulator)
        return accumulator + 1
      }, 0)
    return counter
  }

  render() {
    const { posts } = this.props

    let myPosts = posts.sort(sortBy('voteScore'))


    return (
      <div className="App">
        <h1>Readable 02</h1>

        <CategoryBock />

        {console.log("myPosts: " + JSON.stringify(myPosts))}
        <div id='post-block'>
          <h3>Post:</h3>
          <p>
            <span style={{ color: 'red', fontWeight: 'bold' }}>Order by:</span> <a href='#orderByTime'>Time</a>
            | <a href='#orderByVote'>Vote</a>
          </p>
          <ul>
            {myPosts.map((post) => (

              <li key={post.id} style={{ marginBottom: '20px' }}>
                <a href={`${post.category}/${post.id}`}>{post.title}</a> author: {post.author} <button>Edit</button>  <button>Delete</button>
                <br />
                {this.countPostComments(post.id)} comments
                 | score: {post.voteScore} <a href='#upVote'>Vote Up</a> , <a href='#downVote'>Vote Down</a>
                | category: {post.category} | time:
                <Moment unix tz="Asia/Phnom_Penh">
                  {post.timestamp}
                </Moment>
              </li>


            ))}
          </ul>
        </div>

        <div id='add-new-post-block'>
          <p style={{ textAlign: 'center' }}>
            <a href='#addNewPost'>ADD NEW POST</a>
          </p>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log(state.categories)
  return {
    categories: state.categories,
    posts: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
