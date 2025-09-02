import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { Form } from "./Form";

test('render a input with a label "first name', () => {
  render(<Form closeModal={() => {}} />);

  const inputFirstName = screen.getByTestId("first-name");
  expect(inputFirstName).toHaveAttribute("type", "text");

  const labelFirstName = screen.getByText(/First Name/i);
  expect(labelFirstName).toBeInTheDocument();
});

test("render a input with a label Last name", () => {
  render(<Form closeModal={() => {}} />);

  const inputLastName = screen.getByTestId("last-name");
  expect(inputLastName).toHaveAttribute("type", "text");

  const labelLastName = screen.getByText(/Last Name/i);
  expect(labelLastName).toBeInTheDocument();
});

test("render a input with label email", () => {
  render(<Form closeModal={() => {}} />);
  const inputEmail = screen.getByTestId("email");
  expect(inputEmail).toHaveAttribute("type", "email");

  const labeEmail = screen.getByText(/Email/i);
  expect(labeEmail).toBeInTheDocument();
});

test("render a input with label country", () => {
  render(<Form closeModal={() => {}} />);
  const inputCountry = screen.getByTestId("country");
  expect(inputCountry).toHaveAttribute("type", "text");
});

test("render conditional inputs when comboBox set the movieData", () => {
  render(<Form closeModal={() => {}} />);

  expect(screen.queryByTestId("language")).toBeNull();
  expect(screen.queryByTestId("title")).toBeNull();
  expect(screen.queryByTestId("rate")).toBeNull();
  expect(screen.queryByTestId("date")).toBeNull();
});
