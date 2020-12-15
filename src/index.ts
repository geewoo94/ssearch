import './utils/devSetting.js';

import simpleShadowDom from 'simple-shadow-dom';
import eachStyle from './style/each';
import './style/global.scss';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import LikedPage from './Components/LikedPage';
import PreviewPage from './Components/PreviewPage';
import DetailPage from './Components/DetailPage';

const root = document.getElementById('root');

simpleShadowDom.setEachStyle(eachStyle);

simpleShadowDom.render(root, Header, 'shadow-header');
simpleShadowDom.render(root, MainPage, 'shadow-main');
simpleShadowDom.render(root, LikedPage, 'shadow-liked');
simpleShadowDom.render(root, PreviewPage, 'shadow-preview');
simpleShadowDom.render(root, DetailPage, 'shadow-detail');
