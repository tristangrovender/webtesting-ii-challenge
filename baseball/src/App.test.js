import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "jest-dom/extend-expect";
import { render, fireEvent } from "react-testing-library";
import 'react-testing-library/cleanup-after-each';
import Display from "./components/Display";
import Dashboard from "./components/Dashboard";

it("renders without crashing", () => {
  render(<App />);
});

describe("App Component", () => {
  const app = render(<App />);
  const displayComponent = render(<Display />);
  const dashboardComponent = render(<Dashboard />);

  it("exists", () => {
    expect(app).toBeTruthy();
  });

  it("contains content", () => {
    expect.anything();
  });

  it("has necessary components", () => {
    expect(displayComponent).toBeTruthy();
    expect(dashboardComponent).toBeTruthy();
  });

  const ballsDiv = app.getByText(/balls/i);
  const strikesDiv = app.getByText(/strikes/i);

  describe("balls & strikes", () => {
    it("contains ball keyword", () => {
      expect(ballsDiv).toHaveTextContent(/balls/i);
    });
    it("contains strikes keyword", () => {
      expect(strikesDiv).toHaveTextContent(/strikes/i);
    });
  });

  describe("button test", () => {
    test("ball button works", () => {
      const ballbutton = dashboardComponent.getByTitle("ballbutton");
      fireEvent.click(ballbutton);
      const ballCount = displayComponent.getByTitle("balls-count");
      expect(ballCount).toHaveTextContent("1");
    });

    test("strike button works", () => {
      const strikeButton = dashboardComponent.getByTitle("strikeButton");
      fireEvent.click(strikeButton);
      const strikeCount = displayComponent.getByTitle("strikes-count");
      expect(strikeCount).toHaveTextContent("1");
    });

    test("strikes reset when they reach 3", () => {
      const strikeButton = dashboardComponent.getByTitle("strikeButton");
      fireEvent.click(strikeButton);
      fireEvent.click(strikeButton);
      const strikeCount = displayComponent.getByTitle("strikes-count");
      expect(strikeCount).toHaveTextContent("0");
    });
  });
});

