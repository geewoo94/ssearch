import { Component } from '../AppFactory';
import { storage } from '../types';

import Title from '../atoms/Title';
import NavigationList from '../molecules/NavigationList';

const Navigation = ({ navigationList }: storage) => {
  return (
    new Component('div')
      .setChild(Title, { text: 'Navigation' })
      .setChild(NavigationList, { navigationList })
      .render()
  );
}

export default Navigation;
