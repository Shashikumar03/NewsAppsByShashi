import React, { Component } from "react";
import NavExample from "./components/NavExample";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <>
        {/* <p>this is first button</p>
      <div>
        <Button color="danger">Click Me</Button>
      </div> */}

        {/* ////////////////////////////////////////// */}
        <BrowserRouter>
          <NavExample />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  country="in"
                  category="sports"
                />
              }
            />

            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />

            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  country="in"
                  category="business"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
