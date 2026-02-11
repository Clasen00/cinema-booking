import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useLoginForm } from "../../lib/hooks/useLoginForm";
import { render, screen } from "@testing-library/react";

jest.mock("../../lib/hooks/useLoginForm");

const mockUseLoginForm = useLoginForm as jest.MockedFunction<
  typeof useLoginForm
>;

describe("LoginForm", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /войти/i })).toBeInTheDocument();
  });

  it("displays server error when error is present", () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "Неверные учетные данные",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByText("Неверные учетные данные")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", async () => {
    mockUseLoginForm.mockReturnValue({
      username: "testuser",
      password: "password123",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    const submitButton = screen.getByRole("button", { name: /войти/i });
    await userEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls setUsername when username input changes", async () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    const usernameInput = screen.getByLabelText(/логин/i);
    await userEvent.type(usernameInput, "testuser");

    expect(mockSetUsername).toHaveBeenCalled();
  });

  it("calls setPassword when password input changes", async () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    const passwordInput = screen.getByLabelText(/пароль/i);
    await userEvent.type(passwordInput, "password123");

    expect(mockSetPassword).toHaveBeenCalled();
  });

  it("disables inputs and button when loading", () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: true,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/логин/i)).toBeDisabled();
    expect(screen.getByLabelText(/пароль/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading indicator when loading", () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: true,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("span")).toHaveClass("loadingDots");
  });

  it("displays filled username and password values", () => {
    mockUseLoginForm.mockReturnValue({
      username: "testuser",
      password: "password123",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/логин/i)).toHaveValue("testuser");
    expect(screen.getByLabelText(/пароль/i)).toHaveValue("password123");
  });

  it("renders additional links", () => {
    mockUseLoginForm.mockReturnValue({
      username: "",
      password: "",
      error: "",
      loading: false,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/забыли пароль/i)).toBeInTheDocument();
    expect(
      screen.getByText(/нет аккаунта\? зарегистрироваться/i),
    ).toBeInTheDocument();
  });
});
