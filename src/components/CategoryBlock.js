import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryBlock extends Component {

    render() {
        const { categories } = this.props

        return (
            <div id='category-block'>
                <h3>Category:</h3>
                <ul>
                    <li key='all'>
                        <a href='/'>Root</a>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.path}>
                            <a href={cat.path}>{cat.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    }
}


export default connect(mapStateToProps)(CategoryBlock)