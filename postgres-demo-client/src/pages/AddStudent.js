import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  heading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    marginTop: 80,
  },
  contentArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    margin: 10,
  },
  itemMargin: {
    margin: 10,
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 30,
  },
};

export class AddStudent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      redirect: false,
      first_name: "",
      last_name: "",
      email: "",
      age: "",
      firstErr: false,
      lastErr: false,
      emailErr: false,
      ageErr: false,
      buttonState: false
    };
  }
  componentDidMount = () => {
    this.setState({ loading: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreate = (event) => {
    event.preventDefault();
    const {first_name, last_name, email, age } = this.state
    !first_name.length ? this.setState({firstErr: true}) : this.setState({firstErr: false})
    !last_name.length ? this.setState({lastErr: true}) : this.setState({lastErr: false})
    !email.length ? this.setState({emailErr: true}) : this.setState({emailErr: false})
    !age.length ? this.setState({ageErr: true}) : this.setState({ageErr: false})
    if(first_name.length && last_name.length && email.length && age.length) {
        axios.post('/api/add-student', this.state).then(res => {
            this.setState({redirect: true})
        })
    }
    
  };
  render() {
    const { loading, redirect, firstErr, lastErr, emailErr, ageErr, buttonState } = this.state;
    const { classes } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (redirect) {
        return <Redirect to="/" />;
    }
    return (
      <div className="page-container">
        <Grid container direction="row" justify="center">
          <Grid item xs={6} sm={3} md={8}>
            <Card className={classes.contentArea}>
              <CardHeader className={classes.heading} title="Welcome!" subheader="Please enter your information"/>
              <CardContent>
              <form noValidate autoComplete="off">
                  <TextField
                    type="text"
                    name="first_name"
                    label="First Name"
                    required
                    fullWidth
                    error={firstErr}
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    type="text"
                    required
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    error={lastErr}
                    onChange={this.handleChange}
                  />
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    fullWidth
                    required
                    error={emailErr}
                    onChange={this.handleChange}
                  />
                  <TextField
                    type="number"
                    name="age"
                    label="Age"
                    required
                    fullWidth
                    error={ageErr}
                    onChange={this.handleChange}
                  />
                <Button
                  color="primary"
                  disabled={buttonState}
                  variant="contained"
                  fullWidth
                  onClick={this.handleCreate}
                  className={classes.buttonStyle}
                >
                  Create
                </Button>
              </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddStudent);
