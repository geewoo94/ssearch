import { Component } from '../AppFactory';

const Title = ({ text }: { text: string }) => {
  return (
    new Component('h1')
      .setText(text)
      .render()
  );
}

export default Title;
