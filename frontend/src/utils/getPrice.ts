import { useIntl } from 'react-intl';

export type GetPriceParams = {
    currency?: string;
    value: number;
};

export type GetPriceFn = (params: GetPriceParams) => string;

export const getPrice: GetPriceFn = ({ value, currency = 'RUB' }) => {
    const { formatNumber } = useIntl();
    return formatNumber(value, { currency: 'RUB', style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
