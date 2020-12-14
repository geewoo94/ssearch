import { $blue, $headerHeight, $red } from '../style/theme';

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
        height: 40px;
        margin-bottom: 10px;
        transition: all 1s;
        cursor: pointer;

        &:hover {
          transform: rotate(720deg);
        }
      }

      input {
        height: 40px;
        width: 300px;
        border-radius: 20px;
        color: #292929;
        border: none;
        border: 2px solid #c4c4c4;
        padding: 0 20px;
        outline: none;
      }
    }

    Div:last-child {
      position: relative;

      input[type=range] {
        width: 200px;
      }

      p {
        margin-top: 0;
        position: absolute;
        letter-spacing: 9.1px;
        left: 7px;
        width: 200px;
        color: gray;
        font-weight: bold;
      }
    }
  }
`;

export default style;
