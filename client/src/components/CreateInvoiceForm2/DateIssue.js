import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

import styles from "./styles";

const DateIssue = props => {
  const { classes, onChangeHandler, value } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <DatePicker
          margin="normal"
          label="Date Issued"
          InputLabelProps={{ style: { fontSize: 15 } }}
          InputProps={{ style: { fontSize: 20 } }}
          value={value}
          onChange={onChangeHandler}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(DateIssue);
