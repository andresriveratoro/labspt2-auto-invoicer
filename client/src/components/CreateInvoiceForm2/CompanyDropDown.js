import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "./styles";

const companies = [
  {
    name: "Google"
  },
  {
    name: "Facebook"
  },
  {
    name: "Apple"
  },
  {
    name: "Netflix"
  }
];

const CompanyDropDown = props => {
  const { classes, onChangeHandler, value } = props;
  return (
    <TextField
      InputProps={{
        inputProps: {
          className: classes.textField
        }
      }}
      InputLabelProps={{
        className: classes.label,
        style: { fontSize: 14 }
      }}
      select
      label="Company"
      name="company"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      FormHelperTextProps={{
        className: classes.helperText,
        style: { fontSize: 14 }
      }}
      helperText="Please select your company"
      margin="normal"
    >
      {companies.map(company => (
        <MenuItem key={company._id} value={company.name}>
          {company.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default withStyles(styles)(CompanyDropDown);
