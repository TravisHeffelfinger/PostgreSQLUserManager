import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

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
    marginLeft: "40%",
    marginRight: 30,
    padding: 10,
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
    const {first_name, last_name, email, age} = this.state
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);  
  };

  handleCreate = (event) => {
    event.preventDefault();
    const {first_name, last_name, email, age, firstErr, lastErr, emailErr, ageErr} = this.state
    !first_name.length ? this.setState({firstErr: true}) : this.setState({firstErr: false})
    !last_name.length ? this.setState({lastErr: true}) : this.setState({lastErr: false})
    !email.length ? this.setState({emailErr: true}) : this.setState({emailErr: false})
    !age.length ? this.setState({ageErr: true}) : this.setState({ageErr: false})
    if(first_name.length && last_name.length && email.length && age.length) {
        axios.post('/api/add-student', this.state).then(res => {
            console.log(res.data)
            this.setState({redirect: true})
        })
    }
    
  };
  render() {
    const { loading, redirect } = this.state;
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
              <div className={classes.heading}>
                <Typography variant="h3"> Welcome!</Typography>
                <Typography variant="h4">
                  Please enter your information
                </Typography>
              </div>
              <form noValidate autoComplete="off">
                <Typography variant="h6" className={classes.itemMargin}>
                  First Name:{" "}
                  <TextField
                    type="text"
                    name="first_name"
                    required={true}
                    fullWidth={true}
                    error={this.state.firstErr}
                    autoFocus
                    onChange={this.handleChange}
                  />
                </Typography>
                <Typography variant="h6" className={classes.itemMargin}>
                  Last Name:{" "}
                  <TextField
                    type="text"
                    required
                    name="last_name"
                    fullWidth={true}
                    error={this.state.lastErr}
                    onChange={this.handleChange}
                  />
                </Typography>
                <Typography variant="h6" className={classes.itemMargin}>
                  email:{" "}
                  <TextField
                    type="email"
                    name="email"
                    fullWidth={true}
                    required
                    error={this.state.emailErr}
                    onChange={this.handleChange}
                  />
                </Typography>
                <Typography variant="h6" className={classes.itemMargin}>
                  Age:{" "}
                  <TextField
                    type="number"
                    name="age"
                    required
                    error={this.state.ageErr}
                    onChange={this.handleChange}
                  />
                </Typography>
                <Button
                  color="primary"
                  disabled={this.state.buttonState}
                  variant="contained"
                  onClick={this.handleCreate}
                  className={classes.buttonStyle}
                >
                  Create
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddStudent);
