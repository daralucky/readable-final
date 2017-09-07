import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class CategoryBlock extends Component {

    render() {
        const { categories } = this.props

        return (
            <div id='category-block'>
                <strong>Category:</strong>
                       <NavLink to='/' exact
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'red'
                            }}
                        >Root</NavLink>

                    {categories.map((cat) => (
                             <NavLink to={`/${cat.path}`}
                                activeStyle={{
                                    fontWeight: 'bold',
                                    color: 'red'
                                }}
                            > | {cat.name}</NavLink>

                    ))}
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