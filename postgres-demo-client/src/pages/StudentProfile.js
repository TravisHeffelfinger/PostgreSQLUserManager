import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { CardHeader } from "@material-ui/core";

const styles = {
  items: {
    padding: 10,
  },
  title: {
    padding: 10,
  },
};

export class StudentProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      redirect: false,
      studentId: this.props.student,
      student: {},
      edit: false,
      first_name: "",
      last_name: "",
      email: "",
      age: 0,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/edit-student/${this.state.studentId}`)
      .then((res) => {
        this.setState({ student: res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleCancel = () => {
    this.setState({ edit: false });
  };

  handleDelete = () => {
    axios
      .post(`/api/delete/${this.state.studentId}`)
      .then((res) => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSave = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post(`/api/update-student/${this.state.studentId}`, this.state)
      .then((res) => {
        this.setState({ student: res.data[0] });
        this.setState({ edit: false });
        this.setState({ loading: false });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="page-container">
        <Grid container direction="row" justify="center">
          <Grid item xs={6} sm={3} md={8}>
            <Card>
              <CardHeader
                title={`${this.state.student.first_name} ${this.state.student.last_name}`}
              />
              <hr />
              {!this.state.edit && (
                <CardContent>
                  <Typography variant="h5" className={classes.items}>
                    First Name: {this.state.student.first_name}
                  </Typography>
                  <Typography variant="h5" className={classes.items}>
                    Last Name: {this.state.student.last_name}
                  </Typography>
                  <Typography variant="h5" className={classes.items}>
                    Email Address: {this.state.student.email}
                  </Typography>
                  <Typography variant="h5" className={classes.items}>
                    Age: {this.state.student.age}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleEdit}
                  >
                    Edit
                  </Button>{" "}
                  <Button color="secondary" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </CardContent>
              )}
              {this.state.edit && (
                <CardContent>
                  <form noValidate autoComplete="off">
                    <TextField
                      name="first_name"
                      label="First name"
                      fullWidth
                      placeholder={this.state.student.first_name}
                      onChange={this.handleInput}
                    />
                    <TextField
                      name="last_name"
                      label="Last name"
                      fullWidth
                      placeholder={this.state.student.last_name}
                      onChange={this.handleInput}
                    />
                    <TextField
                      type="email"
                      name="email"
                      label="Email"
                      fullWidth
                      placeholder={this.state.student.email}
                      onChange={(e) => this.handleInput(e)}
                    />
                    <TextField
                      type="number"
                      name="age"
                      label="Age"
                      fullWidth
                      placeholder={this.state.student.age.toString()}
                      onChange={(e) => this.handleInput(e)}
                    />
                    <Button
                      onClick={(e) => this.handleSave(e)}
                      variant="contained"
                      type="submit"
                    >
                      save
                    </Button>{" "}
                    <Button variant="contained" onClick={this.handleCancel}>
                      cancel
                    </Button>
                  </form>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(StudentProfile);
