import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = ({ routes }) => (
  <NavContaienr>
    {routes.map((route) => (
      <StyledNavLink
        key={route.name}
        to={route.path}
        activeClassName="selectied"
        exact
        className="nav-item"
      >
        {route.name}
      </StyledNavLink>
    ))}
  </NavContaienr>
);
export default NavBar;

const NavContaienr = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const StyledNavLink = styled(NavLink)`
  color: initial;
  text-decoration: none;
  position: relative;

  &:hover,
  &:active,
  &:focus {
    background: none;
  }

  & + & {
    margin-left: 1rem;
  }

  &::before {
    transition: all ease-out 300ms;
    content: "";
    position: absolute;
    // width: 120%;
    width: 0%;
    height: 50%;
    top: 40%;
    left: -10%;
    background: var(--primary-color);
    z-index: -1;
  }

  &.hover::before,
  &.selectied::before {
    width: 120%;
    // width: 0%;
  }
`;
