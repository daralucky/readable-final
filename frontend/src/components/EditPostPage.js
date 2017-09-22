import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { postEdit, updateSettings } from '../actions'
import { capitalize } from '../utils/helpers'
import PostForm from './PostForm'
import NavigationBar from './NavigationBar'

class EditPostPage extends Component {

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */
    componentWillMount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromEditPost', false)
        )
    }

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */    componentWillUnmount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromEditPost', false)
        )
    }

    mySubmitHandler(values) {
        //console.log('my handler:: ' + JSON.stringify(values, null, 2))
        this.props.editPost(values)

        //change redirect State in the Store
        this.props.changeSettings('redirectFromEditPost', true)
    }

    render() {
        const postId = this.props.match.params.postId
        const { isRedirectBack, posts, categories } = this.props

        const currentPost = posts[postId]

        //console.log('EditPost:: ' + JSON.stringify(this.props, null, 2))

        const redirectPath = this.props.location.caller ? this.props.location.caller : '/'
        //console.log('redirectPath:: ' + JSON.stringify(redirectPath, null, 2))

        return (
            <div>
                <NavigationBar />

                <div className="my-form-page-header">
                    <Link to={redirectPath} className="back-arrow" title="Back" />
                    {' '}
                    <span className="my-header-title">                        Edit Post
                    </span>
                </div>

                <PostForm
                    initialValues={currentPost}
                    categoryOptions={categories}
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
    let categories = []
    for (let myCat of Object.values(state.categories)) {
        categories.push(
            { 'value': myCat.path, 'text': capitalize(myCat.name) }
        )
    }

    return {
        categories,
        posts: state.posts,
        isRedirectBack: state.settings.redirectFromEditPost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editPost: (value) => (dispatch(postEdit(value))),
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostPage)
