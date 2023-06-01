import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, authSlice, cartSlice } from 'store';
import { bindActionCreators } from '@reduxjs/toolkit';

const actions = {
    ...cartSlice.actions,
    ...authSlice.actions,
};

export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
