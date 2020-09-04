import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button"

export class StudentTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      students: [],
      loading: true,
    };
  }

  componentDidMount() {
    if (this.state.students === []) {
      this.setState({loading: false})
    } else {axios
      .get("/api/students")
      .then((res) => {
        res.data.forEach((student) => {
          this.state.students.push(student);
        });
        console.log("this is from React: ", res.data);
        this.displayStudents();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  displayStudents = () => {
    this.setState({
      loading: false,
    });
  };
  
  render() {
    let display;
    if (this.state.loading === true) {
      display = <li>loading...</li>;
    } else {
      display = this.state.students.map((student) => {
        return (
          <TableRow>
            <TableCell>{student.first_name}</TableCell>
            <TableCell>{student.last_name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.age}</TableCell>
            <TableCell><Button component={Link} to={`/api/edit-student/${student.id}`} >View</Button></TableCell>
          </TableRow>
        );
      });
    }
    return (
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        {display}
      </TableContainer>
    );
  }
}

export default StudentTable;
