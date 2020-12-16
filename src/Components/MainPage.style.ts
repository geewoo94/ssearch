import { $headerHeight, $blue, $white, $gray } from '../style/theme';

const style = `
  .Contents-Wrapper {
    margin-top: ${$headerHeight + 30}px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    margin-right: 20px;
    justify-content: space-around;
    overflow-x: hidden;
    padding: 10px;

    .SiteCard-Wrapper {
      display: flex;
      position: relative;
      flex-direction: column;
      width: 30vw;
      border: 1px solid ${$blue};
      margin-bottom: 30px;
      background: white;

      h1 {
        font-size: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 30px;
        width: calc(30vw - 100px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
          color: ${$blue};
        }
      }

      input {
        height: 30px;
        width: 80%;
        border-radius: 15px;
        border: 1px solid ${$gray};
        padding-left: 10px;
        align-self: center;
        margin-top: 10px;
        outline: none;
      }

      ul {
        padding: 20px;
        margin: 0;

        li {
          padding: 10px;
          border-bottom: 1px solid ${$blue};

          img {
            width: 20px;
            display: inline-block;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
              transform: rotate(30deg) scale(1.5);
            }
          }

          p {
            display: inline-block;
            color: gray;
            margin-left: 10px;
            font-size: 14px;
          }

          .Anchor-Wrapper {
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
              transform: translate(20px);
              color: ${$blue};
            }
          }
        }
      }

      .Close-Button-Wrapper {
        position: absolute;
        right: -1px;
        top: -1px;
        width: 50px;
        height: 50px;
        background: white;
        border-left: 1px solid ${$blue};
        border-bottom: 1px solid ${$blue};

        button {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 40px;
          font-size: 20px;
          background: ${$white};
          border: 1px solid ${$blue};
          z-index: 1;
          transition: all 0.3s;
          overflow: visible;
          outline: none;

          &:hover {
            cursor: pointer;
            transform: scale(1.2);
            color: white;
            background: ${$blue};
          }
        }
      }
    }
  }
`;

export default style;
