import { createGlobalStyle } from "styled-components";

import AmaticSC from './amaticSC-Regular.ttf'

export default createGlobalStyle`
@font-face {
    font-family: 'AmaticSC';
    src: local('AmaticSC-Regular'), url(${AmaticSC}) format ('truetype');
    font-weight: 300;
    font-style: normal;
}
`
