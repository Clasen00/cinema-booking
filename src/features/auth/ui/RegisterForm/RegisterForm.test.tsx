import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { useRegisterForm } from "../../lib/hooks/useRegisterForm";
import { render, screen } from "@testing-library/react";

jest.mock("../../lib/hooks/useRegisterForm");

const mockUseRegisterForm = useRegisterForm as jest.MockedFunction<
  typeof useRegisterForm
>;

describe("RegisterForm", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleChange = jest.fn((e) => e.preventDefault());
  const mockHandleBlur = jest.fn((e) => e.preventDefault());
  const mockedValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders register form correctly", () => {
    mockUseRegisterForm.mockReturnValue({
      values: mockedValues,
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/Имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Зарегистрироваться/i }),
    ).toBeInTheDocument();
  });

  it("displays server error when error is present", () => {
    mockUseRegisterForm.mockReturnValue({
      values: mockedValues,
      errors: {
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      serverError: "Username is required",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", async () => {
    mockUseRegisterForm.mockReturnValue({
      values: {
        username: "test123",
        password: "password123",
        passwordConfirmation: "password123",
      },
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Зарегистрироваться/i,
    });
    await userEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables inputs and button when loading", () => {
    mockUseRegisterForm.mockReturnValue({
      values: {
        username: "test123",
        password: "password123",
        passwordConfirmation: "password123",
      },
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: true,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/Имя пользователя/i)).toBeDisabled();
    expect(screen.getByLabelText(/Пароль/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading indicator when loading", () => {
    mockUseRegisterForm.mockReturnValue({
      values: {
        username: "test123",
        password: "password123",
        passwordConfirmation: "password123",
      },
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: true,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("span")).toHaveClass("loadingDots");
  });

  it("displays filled username and password values", () => {
    mockUseRegisterForm.mockReturnValue({
      values: {
        username: "test123",
        password: "password123",
        passwordConfirmation: "password123",
      },
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/Имя пользователя/i)).toHaveValue("test123");
    expect(screen.getByLabelText(/Пароль/i)).toHaveValue("password123");
  });

  it("renders additional links", () => {
    mockUseRegisterForm.mockReturnValue({
      values: {
        username: "test123",
        password: "password123",
        passwordConfirmation: "password123",
      },
      errors: mockedValues,
      touched: {
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      loading: false,
      serverError: "",
      handleSubmit: mockHandleSubmit,
      getFieldProps: jest.fn(),
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Уже есть аккаунт\?/i)).toBeInTheDocument();
  });
});
