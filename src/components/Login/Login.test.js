
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "Mike" }
    })
  }
}))

test("username should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument()
})

test("password should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument()
})

test("button should be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument()
})

//輸入框值須為空

test("username input be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("")
})
test("password input be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("")
})

//按鈕 disabled
//https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
test("button should be disabled", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeDisabled()
})

//檢查進入頁面時，按鈕是否為 Login 的文字
test("loading should not be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).not.toHaveTextContent(/Please Wait/i)
})

//錯誤提示
test("error message should be invisible", () => {
  render(<Login />);
  // const errorMsgEl = screen.getByText(/Need to check form input/i);
  const errorMsgEl = screen.getByTestId("error");
  expect(errorMsgEl).not.toBeVisible()
})

//當輸入值的時候，輸入框應該隨改變事件而拿到 value
test("username input be change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const userValue = "user"
  fireEvent.change(userInputEl, { target: { value: userValue } })

  expect(userInputEl.value).toBe(userValue)
})

test("username input be change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const passwordValue = "password"
  fireEvent.change(passwordInputEl, { target: { value: passwordValue } })

  expect(passwordInputEl.value).toBe(passwordValue)
})

//輸入框有值的時候，要讓按鈕可以使用
test("input should have vlue and button will be abled", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const textValue = "text"

  fireEvent.change(userInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } })

  expect(buttonInputEl).not.toBeDisabled()
})

//login 的功能測試

//檢查點擊之後，要顯示loading
test("loading should be rendered when click", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const textValue = "text"

  fireEvent.change(userInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } })
  fireEvent.click(buttonInputEl)
  expect(buttonInputEl).toHaveTextContent(/Please Wait/i)
})

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const textValue = "text"

  fireEvent.change(userInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } })
  fireEvent.click(buttonInputEl)
  await waitFor(() => expect(buttonInputEl).not.toHaveTextContent(/Please Wait/i))

})

test("user should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const textValue = "text"

  fireEvent.change(userInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } })
  fireEvent.click(buttonInputEl)

  const userItem = await screen.findByText("Mike")
  expect(userItem).toBeInTheDocument()

  // await waitFor(() => expect(buttonInputEl).not.toHaveTextContent(/Please Wait/i))

})
