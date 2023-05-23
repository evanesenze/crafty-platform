import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'store';
import { cartSlice } from 'store/slices';
import { bindActionCreators } from '@reduxjs/toolkit';

const actions = {
    ...cartSlice.actions,
};

export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
