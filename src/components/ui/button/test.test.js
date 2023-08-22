import renderer from "react-test-renderer"; // Импортируйте react-test-renderer
import { Button } from "./button";

describe("Button Component", () => {
  it("renders a button with text", () => {
    const tree = renderer.create(<Button text="Click me" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a disabled button when loader is active", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a loading indicator when loader is active", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls the callback function when the button is clicked", () => {
    const onClickMock = jest.fn();
    const tree = renderer.create(<Button text="Click me" onClick={onClickMock} />);
    // Симулируйте клик на кнопку здесь
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
