import { $blue, $gray } from '../style/theme';

const style = `
  .LikedPage-Wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: calc(130px + 10px);
    padding: 20px;
    width: 100vw;
    min-width: 700px;

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
      }

      li:nth-child(n + 2) {
        border-top: 1px solid ${$gray};
      }

      li:nth-child(2n) {
        color: ${$blue};
        border-top: 1px solid ${$gray};
      }
    }

    a {
      text-decoration: none;
    }

    a:link {
      color: black;

      &:hover {
        color: ${$blue};
      }
    }

    a:visited {
      color: black;
    }
  }

  .hide {
    display: none;
  }
`;

export default style;
