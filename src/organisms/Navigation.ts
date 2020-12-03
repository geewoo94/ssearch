import { Component } from '../AppFactory';
import { storage } from '../types';

const Navigation = ({ navigationList }: storage) => {
  const children = navigationList.map((title) => (
    { child: () => new Component('li').setText(title).render() }
  ));

  return (
    new Component('ul')
      .setChildren(navigationList.map((title) => (
        { child: () => new Component('li').setText(title).render() }
      )))
      .render()
  );
}

export default Navigation;
