import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { commentAddNew, updateSettings } from '../actions'
import CommentForm from './CommentForm'
import NavigationBar from './NavigationBar'

class AddCommentPage extends Component {

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */
    componentWillMount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromAddComment', false)
        )
    }

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */    componentWillUnmount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromAddComment', false)
        )
    }

    mySubmitHandler(values) {
        //console.log('my handler:: ' + JSON.stringify(values, null, 2))
        this.props.addComment(values)

        //change redirect State in the Store
        this.props.changeSettings('redirectFromAddComment', true)
    }

    render() {
        const postId = this.props.match.params.postId
        const { isRedirectBack } = this.props

        const redirectPath = this.props.location.caller ? this.props.location.caller : '/'

        return (
            <div>
                <NavigationBar />

                <div className="my-post-list-page-header">
                    <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}>
                        Add New Comment
                    </span>
                </div>

                <CommentForm
                    initialValues={{'parentId': postId}}
                    onSubmit={values => this.mySubmitHandler(values)}
                />

                {
                    isRedirectBack && (
                        <Redirect to={redirectPath} />
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isRedirectBack: state.settings.redirectFromAddComment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (value) => (dispatch(commentAddNew(value))),
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCommentPage)
