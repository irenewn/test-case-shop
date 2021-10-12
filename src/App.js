import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import {Catalogue} from "./layouts";

export default class App extends Component {

  isReady() {
    return true;
  }

  getExtendedProps(props) {
    return {
      ...props,
      navigate: (target, state) => props.history.push(target, state),
    };
  }

  render() {
    const isReady = this.isReady();
    if (!isReady) {
      return null;
    }
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
