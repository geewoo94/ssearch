import { $headerHeight, $white } from '../style/theme';

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
    background: ${$white};
    border-bottom: 1px solid black;
    z-index: 2;

    nav ul {
      display: flex;
      padding: 0;

      li {
        font-size: 16px;
        margin: 20px;
        cursor: pointer;
        transition: all 0.3s;
        list-style-type: none;

        &:hover {
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
        border: 1px solid #c4c4c4;
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
        position: absolute;
        letter-spacing: 9.2px;
        left: 7px;
        width: 200px;
      }
    }
  }
`;

export default style;
