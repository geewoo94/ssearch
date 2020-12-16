import { $blue, $gray, $green } from '../style/theme';

const style = `
  .DetailContents-Wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: calc(130px + 10px);
    padding: 20px;
    width: 100vw;
    min-width: 700px;

    h1 {
      color: ${$green};
      margin-bottom: 0;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70vw;

      li {
        width: 100%;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 40px;
        transition: all 0.3s;

        div:first-child {
          height: 30px;

          img {
            display: inline-block;
          }

          p {
            display: inline-block;
            color: gray;
            padding-left: 10px;
          }
        }

        div:last-child {
          margin-top: 20px;
          transition: all 0.3s;

          &:hover > a {
            color: ${$blue};
          }

          &:hover {
            transform: translate(20px);
          }
        }
      }

      li:nth-child(n + 2) {
        border-top: 1px solid ${$gray};
      }

      li:nth-child(2n) {
        border-top: 1px solid ${$gray};
      }
    }

    i {
      background: yellow;
    }
  }
`;

export default style;
