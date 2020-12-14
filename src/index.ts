import './utils/devSetting.js';

import TinyComponent from './_Factory/simpleShadowDom.js';
import './style/global.scss';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import LikedPage from './Components/LikedPage';
import PreviewPage from './Components/PreviewPage';
import DetailPage from './Components/DetailPage';

const root = document.getElementById('root');

TinyComponent.render(root, Header, 'shadow-header');
TinyComponent.render(root, MainPage, 'shadow-main');
TinyComponent.render(root, LikedPage, 'shadow-liked');
TinyComponent.render(root, PreviewPage, 'shadow-preview');
TinyComponent.render(root, DetailPage, 'shadow-detail');

//TODO: eventListener 개선
//global style 어떡할지 정하기.
