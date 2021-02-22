import styled, { css } from "styled-components";
import NavBar from "./NavBar";

const Layout = ({ children, routes }) => {
  return (
    <Container>
      <header className="flex-box">
        <h1>GreenShocks</h1>
        <NavBar routes={routes} />
      </header>
      <main>{children}</main>
      {/* <footer>
        <a href="https://greensock.com/" target="_blank" rel="noreferrer">
          greensock offical docs
        </a>
        <br />
        <a
          href="https://greensock.com/st-demos/"
          target="_blank"
          rel="noreferrer"
        >
          ScrollTrigger Demos
        </a>
      </footer> */}
    </Container>
  );
};

export default Layout;

const LayoutCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
  }
`;

const FooterCss = css`
  font-size: 14px;
  text-transform: uppercase;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 30px;
  margin: 0 auto;

  ${LayoutCss}

  footer {
    ${FooterCss}
  }

  .flex-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
