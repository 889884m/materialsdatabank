import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Typography from '@material-ui/core/Typography';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
// import { TextField } from 'redux-form-material-ui';

// import { reduxForm, Field, reset} from 'redux-form';
// import { reduxForm, reset} from 'redux-form';


import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types';
import _ from 'lodash'

import './index.css'
import { searchDatasetsByFields } from '../../redux/ducks/datasets'
import selectors from  '../../redux/selectors'

import PageHead from '../page-head';
import PageBody from '../page-body';

// Formik Changes
import ReactDOM from 'react-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { Formik, Field, Form, useFormikContext } from 'formik';
// import YupValidation from "./YupValidation";

const style = (theme) => (
  {
    field: {
      width: '100%',
      display: 'flex',
      marginBottom: 2 * theme.spacing.unit,
    },
    textField: {
      flexGrow: 1
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }
)

const handleSubmit = (values, props) => {
  console.log(values);
  alert(JSON.stringify(values));

  props.resetForm();
};

// const handleReset = () => {
//   const { resetForm } = useFormikContext();

//   resetForm();
//   return { handleReset }
// };

class Search extends Component {
  

  search = () => {

    let authors = null;
    let atomicSpecies = null;

    if (_.isString(this.props.authors)) {
      authors = this.props.authors.split(/\s/);
    }
    if (_.isString(this.props.atomicSpecies)) {
      atomicSpecies = this.props.atomicSpecies.split(/\s/);
    }

    this.props.dispatch(
        searchDatasetsByFields(
            this.props.title,
            authors,
            atomicSpecies,
            this.props.mdbId
        )
    );

    this.props.dispatch(push('/results'));
  }

  // reset = () => {
  //   this.props.dispatch(reset('search'));
  // }

  onKeyDown = e => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      this.search();
    }
  }

  render = () => {

  return (
    <Grid container>
      <Grid item sm={3} xs={false}></Grid>
      <Grid item sm={6} xs={12}>
        <Paper>
          <Box m={5} p={3}>
            <Typography variant="h5">Search for Structures</Typography>
            <Formik
              initialValues={{
                        mdbId: '',
                        title: '',
                        authors: '',
                      }}
              // validationSchema={YupValidation}
              onSubmit={handleSubmit}
              // onSubmit={async (values) => {
              //           await new Promise((r) => setTimeout(r, 500));
              //           alert(JSON.stringify(values, null, 2));
              //         }
              //       }
            >
              {(props) => {
                const { name } = props.values;
                return (
                  <Form>
                    {/* First Way */}
                    <TextField
                      label="MDB ID (FePt00001)"
                      name="mdbId"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      value={name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      // helperText={<ErrorMessage name="name" />}
                      error={props.errors.name && props.touched.name}
                      required
                    />
                    {/* Second Way */}
                    <Field
                      as={TextField}
                      label="Name of the structure (e.g. chemical order)"
                      // type="title"
                      name="title"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      // helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />

                    <Field
                      as={TextField}
                      label="Author(s) (e.g. Jane Doe)"
                      name="authors"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      // helperText={<ErrorMessage name="phoneNumber" />}
                      error={
                        props.errors.phoneNumber && props.touched.phoneNumber
                      }
                    />

                    <Field
                      as={TextField}
                      label="Atomic species (e.g. Fe Pt)"
                      name="atomicSpecies"
                      // type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      // helperText={<ErrorMessage name="password" />}
                      error={props.errors.password && props.touched.password}
                    />

                    {/* <Field
                      as={TextField}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      // helperText={<ErrorMessage name="confirmPassword" />}
                      error={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                      }
                    /> */}

                    {/* <TextField
                      name="image"
                      type="file"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      onChange={(event) =>
                        props.setFieldValue("image", event.target.files[0])
                      }
                      onBlur={props.handleBlur}
                      // helperText={<ErrorMessage name="image" />}
                      error={props.errors.image && props.touched.image}
                      required
                    /> */}

                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                      onClick={() => this.search()}
                    >
                      Search
                    </Button>
                    {/* <Button
                      onClick={handleReset}
                      type="reset"
                    >
                      Clear All
                    </Button> */}
                    {/* <CardActions className={classes.actions}>
                      <Button
                        variant="raised"
                        disabled={ submitting || invalid}
                        color="primary"
                        onClick={() => this.search()}
                      >
                      <SearchIcon />
                        Search
                      </Button> */}
                {/* <Button
                  variant="raised"
                  disabled={pristine || submitting}
                  color="primary"
                  onClick={() => this.reset()}
                >
                  <ClearIcon/>
                  Clear
                </Button> */}
                    {/* </CardActions> */}
                  </Form>
                  
                );
              }}
            </Formik>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={3} xs={false}></Grid>
    </Grid>
  );
  }

}

// export default Search;


// class Search extends Component {

//   search = () => {

//     let authors = null;
//     let atomicSpecies = null;

    // if (_.isString(this.props.authors)) {
    //   authors = this.props.authors.split(/\s/);
    // }
    // if (_.isString(this.props.atomicSpecies)) {
    //   atomicSpecies = this.props.atomicSpecies.split(/\s/);
    // }

    // this.props.dispatch(
    //     searchDatasetsByFields(
    //         this.props.title,
    //         authors,
    //         atomicSpecies,
    //         this.props.mdbId
    //     )
    // );

    // this.props.dispatch(push('/results'));
  // }

  // reset = () => {
  //   this.props.dispatch(reset('search'));
  // }

  // onKeyDown = e => {
  //   if(e.keyCode === 13 && e.shiftKey === false) {
  //     this.search();
  //   }
  // }

  // render = () => {
  //   const { pristine, submitting, invalid, classes } = this.props;
  //   return (
  //     <div>
  //       <PageHead>
  //         <Typography  color="inherit" gutterBottom variant="display1">
  //           Search for structures
  //         </Typography>
  //       </PageHead>
  //       <PageBody>
  //         <Card>
  //           <form onKeyDown={this.onKeyDown}>
  //             <CardContent>
  //               <Field
  //                 fullWidth
  //                 name="mdbId"
  //                 className={classes.field}
  //                 component={TextField}
  //                 label="MDB ID (FePt00001)"
  //               />
  //               <Field
  //                 fullWidth
  //                 name="title"
  //                 className={classes.field}
  //                 component={TextField}
  //                 label="Name of the structure (e.g. chemical order)"
  //               />
  //               <Field
  //                 fullWidth
  //                 name="authors"
  //                 className={classes.field}
  //                 component={TextField}
  //                 label="Author (e.g. John Doe and Jane Doe)"
  //               />
  //               <Field
  //                 fullWidth
  //                 name="atomicSpecies"
  //                 className={classes.field}
  //                 component={TextField}
  //                 label="Atomic species (e.g. Fe Pt)"
  //               />

  //             </CardContent>
  //             <CardActions className={classes.actions}>
  //               <Button
  //                 variant="raised"
  //                 disabled={ submitting || invalid}
  //                 color="primary"
  //                 onClick={() => this.search()}
  //               >
  //                 <SearchIcon />
  //                 Search
  //               </Button>
  //               <Button
  //                 variant="raised"
  //                 disabled={pristine || submitting}
  //                 color="primary"
  //                 onClick={() => this.reset()}
  //               >
  //                 <ClearIcon/>
  //                 Clear
  //               </Button>
  //             </CardActions>
  //           </form>
  //         </Card>
  //       </PageBody>
  //     </div>
  //   );
  // }
// }

Search.propTypes = {
  title: PropTypes.string,
  authors: PropTypes.string,
  atomicSpecies:  PropTypes.string
}

Search.defaultProps = {
  title: null,
  authors: null,
  atomicSpecies: null
}

function mapStateToProps(state, ownProps) {

  let search = selectors.search.getSearch(state);
  let props = {}
  if (!_.isNil(search)) {
    props = {...search.values}
  }

  return props;
}

Search = withStyles(style)(Search);
Search = connect(mapStateToProps)(Search)


// export default reduxForm({
//   form: 'search',
//   destroyOnUnmount: false
// })(Search)

// export default { Search };
export default Search;
