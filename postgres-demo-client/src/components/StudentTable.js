import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchRounded from "@material-ui/icons/SearchRounded";
const styles = {
  paper: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
};

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
      this.setState({ loading: false });
    } else {
      axios
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

  handleSort = (event) => {
    console.log(event.target.name);
    if (
      event.target.value === "ascending" ||
      event.target.value === "descending"
    ) {
      this.setState({ sortOrder: event.target.value });
      axios.get(`/api/students/${event.target.value}`).then(
        (res) => {
          let result = [];
          res.data.forEach((student) => result.push(student));
          this.setState({ students: result });
          this.displayStudents();
        },
        (rej) => {
          console.log("sorting failed  ", rej);
        }
      );
    } else {
      axios
        .get(`/api/students`)
        .then((res) => {
          let result = [];
          res.data.forEach((student) => {
            result.push(student);
          });
          this.setState({ students: result });
          console.log("this is from React: ", res.data);
          this.displayStudents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSearch = () => {
    axios
      .post("/api/search", { first: this.state.first_search })
      .then((res) => {
        let result = [];
        console.log(res.data);
        res.data.forEach((student) => result.push(student));
        this.setState({ students: result });
      })
      .catch((rej) => console.log(rej));
  };

  handleDelete = (id) => {
    axios.post(`/api/delete/${id}`).then(() => {
      console.log('deleted user')
      let newState = this.state.students.filter(student => {
        if (student.id !== id) return student
      });
      this.setState({ students: newState })
    })
  }

  displayStudents = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell size="small">
                  <FormControl component="fieldset">
                    <InputLabel>Sort</InputLabel>
                    <Select
                      autoWidth
                      name="ascending"
                      color="primary"
                      onChange={this.handleSort}
                    >
                      <MenuItem value={"none"}>None</MenuItem>
                      <MenuItem value={"ascending"}>A-Z</MenuItem>
                      <MenuItem value={"descending"}>Z-A</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell size="small">
                  <FormControl>
                    <TextField
                      label="Search"
                      name="first_search"
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={this.handleSearch}>
                              <SearchRounded />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableHead>
            {this.state.loading ? (
              <Typography>loading...</Typography>
            ) : (
              this.state.students.map((student) => {
                return (
                  <TableRow>
                    <TableCell>{student.first_name}</TableCell>
                    <TableCell>{student.last_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/api/edit-student/${student.id}`}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        onClick={() => this.handleDelete(student.id)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentTable);
