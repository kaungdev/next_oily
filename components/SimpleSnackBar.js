import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default class SimpleSnackBar extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  state = {
    open: this.props.isOpen
  };

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentWillReceiveProps(props) {
    console.log("im triggered");
    const { isOpen } = props;
    if (isOpen) {
      this.setState(
        {
          open: props.isOpen
        },
        async () => {
          await this.timeout(7000);
          this.setState({
            open: false
          });
        }
      );
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { message } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
