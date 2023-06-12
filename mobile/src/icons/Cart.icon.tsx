import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface IconProps {
  size: number;
  fill?: boolean;
}

const CartIcon: React.FC<IconProps> = ({ size, fill }) => {
  return fill ? (
    <Svg width={size} height={size} viewBox="0 0 24 22" fill="none">
      <Path
        d="M5.78587 21C5.27302 21 4.82032 20.6651 4.67026 20.1747L1.46145 9.68808C1.23199 8.93822 1.79287 8.18005 2.57705 8.18005H21.4324C22.2138 8.18005 22.7743 8.93315 22.55 9.68163L19.4074 20.1682C19.2594 20.6619 18.8051 21 18.2898 21H5.78587Z"
        fill="white"
      />
      <Path
        d="M4.4375 8.17948L9.97283 1.92382C11.0628 0.69206 12.9372 0.692059 14.0272 1.92382L19.5625 8.17948M22.55 9.68163L19.4073 20.1682C19.2594 20.6619 18.8051 21 18.2898 21H5.78587C5.27302 21 4.82032 20.6651 4.67026 20.1747L1.46145 9.68808C1.23199 8.93822 1.79287 8.18005 2.57705 8.18005H21.4324C22.2138 8.18005 22.7743 8.93315 22.55 9.68163Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 24 22" fill="none">
      <Path
        d="M4.10449 8.17948L9.63982 1.92382C10.7297 0.69206 12.6042 0.692059 13.6942 1.92382L19.2295 8.17948M22.217 9.68163L19.0743 20.1682C18.9264 20.6619 18.4721 21 17.9568 21H5.45286C4.94002 21 4.48731 20.6651 4.33725 20.1747L1.12844 9.68808C0.898986 8.93822 1.45986 8.18005 2.24405 8.18005H21.0994C21.8808 8.18005 22.4413 8.93315 22.217 9.68163Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CartIcon;
