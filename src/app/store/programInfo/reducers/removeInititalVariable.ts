import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramInfo } from '../ProgramInfo';

/**
 * Removes a initial variable at a given index.
 */
export function removeInitialVariable(
    state: ProgramInfo,
    action: PayloadAction<number>
): ProgramInfo {
    const firstPart = state.initialVariables.slice(0, action.payload);
    const secondPart = state.initialVariables.slice(action.payload + 1);

    return {
        ...state,
        initialVariables: firstPart.concat(secondPart),
    };
}
