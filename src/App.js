import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Catalogue} from "./layouts";

export default class App extends Component {
  getExtendedProps(props) {
    return {
      ...props,
      navigate: (target, state) => props.history.push(target, state),
    };
  }

  render() {
    return <BrowserRouter>{this.renderLayoutRoutes()}</BrowserRouter>;
  }

  renderLayoutRoutes() {
    return (
      <Switch>
        <Route
          path="/"
          component={(props) => <Catalogue {...this.getExtendedProps(props)} />}
        />
      </Switch>
    );
  }
}
