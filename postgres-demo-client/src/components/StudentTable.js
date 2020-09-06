import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'
import { Typography } from "@material-ui/core";


export class StudentTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      students: [],
      loading: true,
      sortOrder: ''
    };
  }

  componentDidMount() {
    if (this.state.students === []) {
      this.setState({loading: true})
    } else {axios
      .get(`/api/students`)
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
  handleSort = (event) => {
    if(event.target.name === 'ascending' || event.target.name === "descending") {
      this.setState({sortOrder: event.target.name})
      axios.get(`/api/students/${event.target.name}`)
      .then(res => {
        let result = []
        res.data.forEach(student => result.push(student))
        this.setState({ students: result})
        this.displayStudents();

      }, rej => {
        console.log('sorting failed  ', rej)
      })
    } else {
      axios.get(`/api/students`)
      .then((res) => {
        let result = []
        res.data.forEach((student) => {
          result.push(student);
        });
        this.setState({students: result})
        console.log("this is from React: ", res.data);
        this.displayStudents();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  handleChange= (event) =>{
    this.setState({[event.target.name]: event.target.value})
  }
  handleSearch = () => {
    axios.post("/api/search", {first: this.state.first_search})
    .then(res => {
      let result = []
      console.log(res.data)
      res.data.forEach(student => result.push(student))
      this.setState({students: result})
    }).catch(rej => console.log(rej))
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
            <TableCell><Button variant="contained" component={Link} to={`/api/edit-student/${student.id}`} >View</Button></TableCell>
          </TableRow>
        );
      });
    }
    return (
      <Grid container direction="row" justify="center">
      <Grid item xs={6} sm={3} md={8}>
      <Card>
      <Typography variant="h3">PostgreSQL UserManager</Typography>
      <TableContainer >
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sort</FormLabel>
                <RadioGroup  row name="gender1"  >
                  <FormControlLabel  value="ascending"control={<Radio name="ascending" color="primary" onChange={this.handleSort}/>} label="A-Z" />
                  <FormControlLabel value="none"control={<Radio name="none" color="primary" onChange={this.handleSort}/>} label="none" />
                  <FormControlLabel  value="decending" control={<Radio name="descending" color="primary" onChange={this.handleSort}/>} label="Z-A" />
                </RadioGroup>
                <TextField label="Search" name="first_search" onChange={this.handleChange}/>
                <Button color="primary" variant='contained' onClick={this.handleSearch}>Search</Button>
              </FormControl>
              </TableCell>
          </TableRow>
        </TableHead>
        {display}
      </TableContainer>
      </Card>
      </Grid>
      </Grid>
    );
  }

  }
export default StudentTable;
