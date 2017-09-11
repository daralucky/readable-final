import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { capitalize } from '../utils/helpers'

class NavigationBar extends Component {

    render() {
        const { categories } = this.props


        const style = {
            fontWeight: 'bold',
            color: 'red'
        }

        return (

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Project Readable</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer exact activeStyle={style} to="/">
                            <NavItem>All</NavItem>
                        </LinkContainer>
                        {
                            categories.map((cat) => (
                                <LinkContainer key={cat.path} activeStyle={style} to={`/${cat.path}`}>
                                    <NavItem>{capitalize(cat.name)}</NavItem>
                                </LinkContainer>

                            ))
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    let categories = []
    for (let [key, myCat] of Object.entries(state.categories)) {
        categories.push(myCat)
    }

    return { categories }
}

export default connect(mapStateToProps)(NavigationBar)