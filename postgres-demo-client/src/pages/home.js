import React, { Component } from 'react'
//import axios from 'axios'

import StudentTable from '../components/StudentTable'
import StudentProfile from './StudentProfile'

class home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            students: [],
            loading: true };
    }

    render() {
        //console.log('this is params', this.props.match.params.student)
        let obj = this.props.match.params
        return (
            <main>
                <h1>Home</h1>
                {
                    Object.keys(obj).length === 0  ?  <StudentTable/>:
                    <StudentProfile student={this.props.match.params.student} />
                }
            </main>
        )
    }
}

export default home
