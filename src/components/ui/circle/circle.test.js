import React from "react";
import renderer from "react-test-renderer";
import { Circle } from "./circle"; // Путь к вашему компоненту
import { ElementStates } from "../../../types/element-states";

describe("Circle Component Snapshots", () => {
  it("renders correctly without letter and elements", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a letter", () => {
    const tree = renderer.create(<Circle letter="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a head", () => {
    const tree = renderer.create(<Circle head="Head" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a tail", () => {
    const tree = renderer.create(<Circle tail="Tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with an index", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly as small circle", () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly in default state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly in changing state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly in modified state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a react element in head", () => {
    const reactElement = <span>React Element in Head</span>;
    const tree = renderer.create(<Circle head={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a react element in tail", () => {
    const reactElement = <span>React Element in Tail</span>;
    const tree = renderer.create(<Circle tail={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
