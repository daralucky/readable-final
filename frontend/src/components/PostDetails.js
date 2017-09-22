import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment-timezone'
import { postUpdateVote } from '../actions'
import NavigationBar from './NavigationBar'
import * as CONSTANTS from '../constants'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import CommentBlock from './CommentBlock'

class PostDetails extends Component {

    render() {

        const postId = this.props.match.params.postId
        const { posts, votePost } = this.props
        // console.log(JSON.stringify(this.props))

        const currentPost = posts[postId]

        return (
            <div>

                <NavigationBar />

                {currentPost && (
                    <div id='detail-block'>
                        {//prevent deleted post from showing
                            currentPost.deleted && (
                                <Redirect to='/' />
                            )
                        }
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
                                        {currentPost.title}
                                        {' '}
                                        <EditPost postId={currentPost.id} caller={this.props.location.pathname} />
                                        {' '}
                                        <DeletePost postId={currentPost.id} needRedirection={true} caller={currentPost.category} />
                                    </p>
                                    <p className="detail-tagline">
                                        submitted on <Moment unix tz="Asia/Phnom_Penh" format="DD MMM YYYY HH:mm">
                                            {currentPost.timestamp}
                                        </Moment> by {currentPost.author}
                                    </p>
                                    <p style={{ marginBottom: '20px' }}>
                                        {currentPost.body}
                                    </p>

                                    <CommentBlock postId={currentPost.id} />

                                </div>
                            </div>
                        </div>
                    </div>
                )
                }

            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        votePost: (postId, newSore) => (dispatch(postUpdateVote(postId, newSore)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)

