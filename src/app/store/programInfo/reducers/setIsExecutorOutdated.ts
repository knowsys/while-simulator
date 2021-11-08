import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramInfo } from '../ProgramInfo';

export function setIsExecutorOutdated(
    state: ProgramInfo,
    action: PayloadAction<boolean>
): ProgramInfo {
    return {
        ...state,
        isExecutorOutdated: action.payload,
    };
}
