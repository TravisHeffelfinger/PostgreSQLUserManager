import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'


export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar className="navbar">
                    <Button component={Link} to='/' >Home</Button>
                    <Button component={Link} to='/add-student'>Add Student</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default NavBar
