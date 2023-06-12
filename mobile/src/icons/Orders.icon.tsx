import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './Cart.icon';

const OrdersIcon: React.FC<IconProps> = ({ size, fill }) => {
  return fill ? (
    <Svg width={size} height={size} viewBox="0 0 23 22" fill="none">
      <Path
        d="M21 4.8868V7.23831C21 8.77359 20 9.74529 18.42 9.74529H15V2.95312C15 1.87453 15.91 1 17.02 1C18.11 1.00972 19.11 1.43726 19.83 2.13689C20.55 2.84623 21 3.81793 21 4.8868Z"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1 5.8585V19.4623C1 20.2688 1.93998 20.7255 2.59998 20.2396L4.31 18.9959C4.71 18.7044 5.27 18.7432 5.63 19.093L7.28998 20.7158C7.67998 21.0947 8.32002 21.0947 8.71002 20.7158L10.39 19.0833C10.74 18.7432 11.3 18.7044 11.69 18.9959L13.4 20.2396C14.06 20.7158 15 20.2591 15 19.4623V2.9434C15 1.87453 15.9 1 17 1H6H5C2 1 1 2.73934 1 4.8868V5.8585Z"
        fill="white"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M5 7.80176H11" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M5.75 11.6885H10.25" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 23 22" fill="none">
      <Path
        d="M21.333 4.8868V7.23831C21.333 8.77359 20.333 9.74529 18.753 9.74529H15.333V2.95312C15.333 1.87453 16.243 1 17.353 1C18.443 1.00972 19.443 1.43726 20.163 2.13689C20.883 2.84623 21.333 3.81793 21.333 4.8868Z"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.33301 5.8585V19.4623C1.33301 20.2688 2.27298 20.7255 2.93298 20.2396L4.64301 18.9959C5.04301 18.7044 5.60301 18.7432 5.96301 19.093L7.62299 20.7158C8.01299 21.0947 8.65303 21.0947 9.04303 20.7158L10.723 19.0833C11.073 18.7432 11.633 18.7044 12.023 18.9959L13.733 20.2396C14.393 20.7158 15.333 20.2591 15.333 19.4623V2.9434C15.333 1.87453 16.233 1 17.333 1H6.33301H5.33301C2.33301 1 1.33301 2.73934 1.33301 4.8868V5.8585Z"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M5.33301 7.80176H11.333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M6.08301 11.6885H10.583" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};

export default OrdersIcon;
