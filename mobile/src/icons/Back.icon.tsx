import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BackIcon: React.FC = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path d="M20 24L12 16L20 8" stroke="url(#paint0_linear_56_513)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <Defs>
        <LinearGradient id="paint0_linear_56_513" x1="23" y1="5" x2="9" y2="27" gradientUnits="userSpaceOnUse">
          <Stop stop-color="gray" />
          <Stop offset="1" stop-color="#F4A360" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default BackIcon;
