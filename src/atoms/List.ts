import { Component } from '../AppFactory';

const List = ({ list }: { list: string[] }) => {
  const children = list.map((text) => (
    { child: () => new Component('li').setText(text).render() }
  ));

  return (
    new Component('ul')
      .setChildren(children)
      .render()
  );
}

export default List;
