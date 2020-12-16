import { $blue, $green, $headerHeight, $red, $yellow } from '../style/theme';

const style = `
  .Header-Wrapper {
    position: fixed;
    height: ${$headerHeight}px;
    top: 0;
    width: 100vw;
    min-width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-image-width: 0 0 0 20px;
    z-index: 2;
    transition: all 0.5s;

    box-sizing: border-box;
    border-style: solid;
    border-image: linear-gradient(to right, #01c9ca 0%, #3886FF 100%);
    border-image-slice: 1;
    background: #f7f7f7;
    border-image-width: 0 0 4px 0px;

    nav ul {
      display: flex;
      padding: 0;

      li {
        font-size: 20px;
        margin: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: ${$blue};
        font-family: 'Jua', sans-serif;

        &:hover {
          color: ${$red};
          transform: scale(1.1);
        }
      }
    }

    div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        height: 50px;
        margin-bottom: 10px;
        transition: all 1s;
        cursor: pointer;

        &:hover {
          transform: rotate(720deg);
        }
      }

      input {
        height: 35px;
        width: 300px;
        border-radius: 20px;
        color: #292929;
        border: none;
        border: 2px solid #c4c4c4;
        padding: 0 20px;
        outline: none;
        transition: all 0.3s
      }

      input:focus {
        background: ${$green};
        color: white;
      }
    }

    Div:last-child {
      position: relative;
      width: 200px;

      input[type=range] {
        width: inherit;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        left: 7px;
        width: inherit;
        padding: 0 3px 0 7px;
        color: gray;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: -20px;
      }
    }

    input[type=range]{
      -webkit-appearance: none;
      position: relative;
      top: -8px;
    }

    input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 3px;
      background: ${$blue};
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${$green};
      margin-top: -6px;
    }

    input[type=range]:focus {
      outline: none;
    }
  }
`;

export default style;
