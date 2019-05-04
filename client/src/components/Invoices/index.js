import React, { useState, useContext, useEffect } from "react";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
// import components here

import EmptyInvoices from "../EmptyInvoices";
import { Link } from "react-router-dom";
import styles from "./style";

import EditDialog from "../EditDialog.js";

// Import Data Here
import UserContext from "../../context/UserContext";

const Invoices = props => {
  const context = useContext(UserContext);
  const invoices = context.user.invoices;
  const userID = context.user._id;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [buttonSize, setButtonSize] = useState("large");
  // const [filter, setFilter] = useState("all");

  const rowsPerPageFunc = () => {
    window.innerWidth > 500 ? setRowsPerPage(10) : setRowsPerPage(5);
  };
  const buttonSizeFunc = () => {
    window.innerWidth > 500 ? setButtonSize("large") : setButtonSize("medium");
  };

  useEffect(() => {
    rowsPerPageFunc();
    buttonSizeFunc();  
  }, []);
 
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const dueDate = str => {
    return str.slice(4, 16);
  };
  const ellipsis = str => {
    let shortened = str.length >= 10 ? str.slice(0, 10) + "..." : str;
    return shortened;
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const lateChecker = date => {
    let year = date.slice(11, 15);
    let month = date.slice(4, 7);
    let day = date.slice(8, 10);
    let monthConvertedToNumber = 0;
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let monthInNumberForm = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    for (let i = 0; i < months.length; i++) {
      if (months[i] === month) {
        monthConvertedToNumber = monthInNumberForm[i];
      }
    }
    let dateInNumberForm = parseInt(year + monthConvertedToNumber + day, 10);
    return dateInNumberForm;
  };

  const invoiceSearch = invoices => {
    let invoicesToShow =
      search === ""
        ? invoices
        : invoices.filter(invoice => {
            return invoice.number.includes(search);
          });
    return invoicesToShow;
  };

  const status = (invoice, tooltips) => {
    if (Number(invoice.balance) === 0) {
      return (
        <Tooltip
          placement="left"
          title="Paid"
          classes={{
            tooltip: tooltips
          }}
        >
          <i
            className="material-icons"
            style={{ color: "green", fontSize: 36 }}
          >
            attach_money
          </i>
        </Tooltip>
      );
    } else if (lateChecker(Date()) > lateChecker(String(invoice.dueDate))) {
      return (
        <Tooltip
          placement="left"
          title="Late"
          classes={{
            tooltip: tooltips
          }}
        >
          <i className="material-icons" style={{ color: "red", fontSize: 36 }}>
            attach_money
          </i>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
          placement="left"
          title="Outstanding"
          classes={{
            tooltip: tooltips
          }}
        >
          <i
            className="material-icons"
            style={{ color: "#FFFF00", fontSize: 36 }}
          >
            attach_money
          </i>
        </Tooltip>
      );
    }
  };

  const { classes } = props;
  const emptyRows =
    { rowsPerPage } -
    Math.min(
      { rowsPerPage },
      context.user.invoices.length - { page } * { rowsPerPage }
    );

  const themes = createMuiTheme({
    typography: {
      fontSize: 30,
      useNextVariants: true
    }
  });
  return (
    
    <section>
      {invoices.length < 1 ? (
        <EmptyInvoices userID={userID} />
      ) : (
        <Grow in={true} {...{ timeout: 1300 }}>
          <Paper className={classes.root}>
            <div className={classes.rootbar}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#eff7f2"
                }}
              >
                <Toolbar>
                  <Typography
                    className={classes.title}
                    color="inherit"
                    noWrap
                  >
                    Invoices
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      name="search"
                      onChange={e => setSearch(e.target.value)}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div>
                    <Link to={`/user/${userID}/invoice/create`}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        style={{
                          backgroundColor: "#4fc878",
                          color: "white"
                        }}
                        size={buttonSize}
                      >
                        Create
                      </Button>
                    </Link>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Number
                    </TableCell>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Status
                    </TableCell>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Name
                    </TableCell>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Due Date
                    </TableCell>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Total Due
                    </TableCell>
                    <TableCell style={{ fontSize: 30 }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                  {invoiceSearch(invoices)
                    .slice(
                      page  * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map(invoice => (
                      <TableRow
                        className={classes.tableRowHover}
                        key={invoice._id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{
                            fontSize: 25
                          }}
                        >
                          <Tooltip
                            placement="right"
                            title={invoice.number}
                            classes={{
                              tooltip: classes.tooltipNumber
                            }}
                          >
                            <div>{ellipsis(invoice.number)}</div>
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ fontSize: 25 }}
                        >
                          {status(invoice, classes.tooltip)}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          {capitalizeFirstLetter(invoice.customer.name)}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          {dueDate(invoice.dueDate)}
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          <Tooltip
                            placement="right"
                            title={invoice.total}
                            classes={{
                              tooltip: classes.tooltipNumber
                            }}
                          >
                            <div>{ellipsis(invoice.total)}</div>
                          </Tooltip>
                        </TableCell>
                        <TableCell style={{ fontSize: 25 }} align="center">
                          <div className={classes.shortcuts}>
                            <Link
                              className="card-links"
                              to={`/user/${userID}/invoice/${
                                invoice._id
                              }/view`}
                            >
                              <Tooltip
                                title="View Invoice"
                                placement="left"
                                classes={{
                                  tooltip: classes.tooltip
                                }}
                              >
                                <div className={classes.shortcutsCircle}>
                                  <i
                                    className="material-icons"
                                    style={{
                                      color: "#4fc878",
                                      fontSize: 36
                                    }}
                                  >
                                    visibility
                                  </i>
                                </div>
                              </Tooltip>
                            </Link>
                            <Tooltip
                              title="Download PDF"
                              classes={{
                                tooltip: classes.tooltip
                              }}
                            >
                              <div
                                onClick={() => {
                                  props.createPDF(invoice);
                                }}
                                className={classes.shortcutsCircle}
                              >
                                <i
                                  className="material-icons"
                                  style={{
                                    color: "#4fc878",
                                    fontSize: 36
                                  }}
                                >
                                  save_alt
                                </i>
                              </div>
                            </Tooltip>
                            <EditDialog invoice={invoice} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 48 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter style={{ fontSize: 15 }}>
                  <TableRow style={{ fontSize: 15 }}>
                    <MuiThemeProvider theme={themes}>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        backIconButtonProps={{
                          "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                          "aria-label": "Next Page"
                        }}
                        colSpan={3}
                          count={invoiceSearch(invoices).length}
                        rowsPerPage={rowsPerPage}
                        page = {page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </MuiThemeProvider>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
        </Grow>
      )}
    </section>
  );
};

export default withStyles(styles)(Invoices);
