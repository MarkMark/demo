import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  system,
  typography,
} from "styled-system";

import styled from "styled-components";

type TBox = SpaceProps &
  LayoutProps &
  BorderProps &
  ColorProps &
  FlexboxProps &
  TypographyProps &
  PositionProps;

export const Box = styled.div<TBox>`
  ${space};
  ${layout};
  ${flexbox};
  ${border};
  ${color};
  ${typography};
  ${position};
  ${system({
    textDecoration: true,
    userSelect: true,
    whiteSpace: true,
  })};
`;
