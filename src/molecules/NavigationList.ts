import { Component } from '../AppFactory';
import { storage } from '../types';

import Title from '../atoms/Title';
import List from '../atoms/list';

const NavigationList = ({ navigationList }: storage) => {
  return (
    new Component('nav')
      .setChild(List, { list: navigationList })
      .render()
  );
}

export default NavigationList;
