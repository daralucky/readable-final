import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment-timezone'
import { commentUpdateVote } from '../actions'
import * as CONSTANTS from '../constants'
import DeleteComment from './DeleteComment'
import AddComment from './AddComment'
import EditComment from './EditComment'

class CommentBlock extends Component {

    render() {
        //console.log('CommentBlock: ' + JSON.stringify(this.props, null, 2))
        const { comments, voteComment, postId } = this.props

        const currentComments = comments.filter(c =>
            c.parentId === postId
            && c.deleted === false
            && c.parentDeleted === false).sort(sortBy('-voteScore'))


        return (
            <section id='comments'>
                <div id='comments-block'>
                    <div className="detail-comment-header">
                        {currentComments.length} Comments:
                        {' '}
                        <AddComment postId={postId} caller={this.props.location.pathname} />
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
                                        <EditComment commentId={comment.id} caller={this.props.location.pathname} /> |
                                                                <DeleteComment commentId={comment.id} />
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
        )
    }
}




const mapStateToProps = state => {

    let comments = []
    for (let myComment of Object.values(state.comments)) {
        comments.push(myComment)
    }

    return {
        comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        voteComment: (commentId, newSore) => (dispatch(commentUpdateVote(commentId, newSore))),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CommentBlock)
)

