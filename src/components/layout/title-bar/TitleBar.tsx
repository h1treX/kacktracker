import {FC} from "react";
import {NavBar} from "antd-mobile";

export const TitleBar: FC = () => {
  return (
    <NavBar backIcon={false}>
      <span>💩</span>
      <span>Kacktracker</span>
    </NavBar>
  )
}