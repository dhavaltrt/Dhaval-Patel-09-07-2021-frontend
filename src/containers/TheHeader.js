import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { themeChangeSettings, letLogoutUser } from "../store/actions";

const TheHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const sidebarShow = useSelector((state) => state.theme.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(themeChangeSettings({ sidebarShow: val }));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(themeChangeSettings({ sidebarShow: val }));
  };

  // on logout click
  const handleLogoutCLick = async () => {
    try {
      dispatch(letLogoutUser());
    } catch (error) {}
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <h3>SIS CLOUD</h3>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/message/compose">Compose</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/message/list">Messages</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none c-d-legacy-none"
          onClick={() => dispatch(themeChangeSettings({ darkMode: !darkMode }))}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="Dark Mode" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="Light Mode" />
        </CToggler>
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={handleLogoutCLick}
        >
          <CIcon
            className="mr-2"
            size="lg"
            name="cil-account-logout"
            title="Logout"
          />
        </CToggler>
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
