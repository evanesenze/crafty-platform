import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './Cart.icon';

const ProfileIcon: React.FC<IconProps> = ({ size, fill }) => {
  return fill ? (
    <Svg width={size} height={size} viewBox="0 0 24 22" fill="none">
      <Path
        d="M20 21.9997V19.7775C20 18.5987 19.5259 17.4683 18.682 16.6348C17.8381 15.8013 16.6935 15.333 15.5 15.333H6.5C5.30653 15.333 4.16193 15.8013 3.31802 16.6348C2.47411 17.4683 2 18.5987 2 19.7775V21.9997"
        fill="white"
      />
      <Path
        d="M20 21.9997V19.7775C20 18.5987 19.5259 17.4683 18.682 16.6348C17.8381 15.8013 16.6935 15.333 15.5 15.333H6.5C5.30653 15.333 4.16193 15.8013 3.31802 16.6348C2.47411 17.4683 2 18.5987 2 19.7775V21.9997"
        stroke="white"
        stroke-width="2.08333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11 10.8889C13.4853 10.8889 15.5 8.89904 15.5 6.44444C15.5 3.98985 13.4853 2 11 2C8.51472 2 6.5 3.98985 6.5 6.44444C6.5 8.89904 8.51472 10.8889 11 10.8889Z"
        fill="white"
        stroke="white"
        stroke-width="2.08333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 22 24" fill="none">
      <Path
        d="M20 21.9997V19.7775C20 18.5987 19.5259 17.4683 18.682 16.6348C17.8381 15.8013 16.6935 15.333 15.5 15.333H6.5C5.30653 15.333 4.16193 15.8013 3.31802 16.6348C2.47411 17.4683 2 18.5987 2 19.7775V21.9997"
        stroke="white"
        stroke-width="2.08333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11 10.8889C13.4853 10.8889 15.5 8.89904 15.5 6.44444C15.5 3.98985 13.4853 2 11 2C8.51472 2 6.5 3.98985 6.5 6.44444C6.5 8.89904 8.51472 10.8889 11 10.8889Z"
        stroke="white"
        stroke-width="2.08333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
