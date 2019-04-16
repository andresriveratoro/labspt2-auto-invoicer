import React from "react";

import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
//import { TextField } from "../../../node_modules/@material-ui/core";
import { TextField } from "@material-ui/core";

const Total = props => {
  const { classes, onChangeHandler, value } = props;
  return (
    <TextField
      id="filled-name"
      label="Total"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      style={{ width: 300 }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      InputProps={{ style: { fontSize: 12 } }}
      margin="normal"
    />
  );
};

export default withStyles(styles)(Total);
