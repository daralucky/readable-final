import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { Button, Glyphicon } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment-timezone'
import { postUpdateVote, commentUpdateVote } from '../actions'
import NavigationBar from './NavigationBar'
import * as CONSTANTS from '../constants'

class DetailPage extends Component {
    render() {

        const postId = this.props.match.params.postId
        const { posts, votePost, comments, voteComment } = this.props
        //console.log(JSON.stringify(this.props.match.params))
        //console.log(JSON.stringify(this.props.location))

        // console.log(JSON.stringify(this.props))

        const currentPost = posts[postId]

        const currentComments = comments.filter(c => c.parentId === currentPost.id).sort(sortBy('-voteScore'))


        return (
            <div>
                <NavigationBar />

                {currentPost && (

                    <div id='detail-block'>

                        <div key={currentPost.id}>
                            <div className="midcol">
                                <div tabIndex="0" title="Vote Up">
                                    <Button bsStyle="success" bsSize="xsmall"
                                        onClick={() => votePost(currentPost.id, CONSTANTS.UP_VOTE)}
                                    >
                                        <Glyphicon glyph="thumbs-up" />
                                    </Button>
                                </div>
                                <div className="my-post-votescore" title={`${currentPost.voteScore} Vote Score`}>{currentPost.voteScore}</div>
                                <div tabIndex="0" title="Vote Down">
                                    <Button bsStyle="info" bsSize="xsmall"
                                        onClick={() => votePost(currentPost.id, CONSTANTS.DOWN_VOTE)}
                                    >
                                        <Glyphicon glyph="thumbs-down" />
                                    </Button>
                                </div>
                            </div>
                            <div className="entry">
                                <div>
                                    <p className="detail-title">
                                        {currentPost.title} <Button onClick={this.onHome} bsStyle="warning" bsSize="xsmall">
                                            <Glyphicon glyph="pencil" /> Edit
                                            </Button> <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                            <Glyphicon glyph="trash" /> Delete </Button>
                                    </p>
                                    <p className="detail-tagline">
                                        submitted on <Moment unix tz="Asia/Phnom_Penh" format="DD MMM YYYY HH:mm">
                                            {currentPost.timestamp}
                                        </Moment> by {currentPost.author}
                                    </p>
                                    <p style={{ marginBottom: '20px' }}>
                                        {currentPost.body}
                                    </p>

                                    <section id='comments'>
                                        <div id='comments-block'>
                                            <div className="detail-comment-header">
                                                {currentComments.length} Comments: <span className="pull-right"><Button onClick={this.onHome} bsStyle="success" bsSize="xsmall">
                                                    <Glyphicon glyph="plus" /> Add New Comment
                                            </Button></span>
                                            </div>

                                            {currentComments.map((comment) => (
                                                <div key={comment.id} className="comment-item">
                                                    <div className="midcol">
                                                        <div tabIndex="0" title="Vote Up">
                                                            <button type="button" className="btn btn-xxsmall btn-success" onClick={() => voteComment(comment.id, CONSTANTS.UP_VOTE)}>
                                                                <span className="glyphicon glyphicon-thumbs-up"></span>
                                                            </button>
                                                        </div>
                                                        <div className="my-comment-votescore" title={`${comment.voteScore} Vote Score`}>{comment.voteScore}</div>
                                                        <div tabIndex="0" title="Vote Down">
                                                            <button type="button" className="btn btn-xxsmall btn-info" onClick={() => voteComment(comment.id, CONSTANTS.DOWN_VOTE)}>
                                                                <span className="glyphicon glyphicon-thumbs-down"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="entry">
                                                        <div>
                                                            <p style={{ marginBottom: '0px' }}>
                                                                <span style={{ fontWeight: 'bold' }}>{comment.author} </span>
                                                                <span style={{ fontSize: 'smaller', color: '#888' }}> (
                                                                    <Moment unix tz="Asia/Phnom_Penh" format="DD MMM YYYY HH:mm">
                                                                        {comment.timestamp}
                                                                    </Moment>
                                                                    ) </span>
                                                                <a href='#edit'>edit </a> | <a href='#delete'> delete </a>
                                                            </p>
                                                            <p style={{ fontSize: '12px' }}>
                                                                {comment.body}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>



                    </div>
                )}

            </div>
        )
    }
}


const MyLargeModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
})




const mapStateToProps = state => {

    let comments = []
    for (let myComment of Object.values(state.comments)) {
        comments.push(myComment)
    }

    return {
        posts: state.posts,
        comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //changeSettings: (key, value) => dispatch(updateSettings(key, value)),
        votePost: (postId, newSore) => (dispatch(postUpdateVote(postId, newSore))),
        voteComment: (commentId, newSore) => (dispatch(commentUpdateVote(commentId, newSore)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPage)



//export default DetailPage