import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramInfo } from '../ProgramInfo';

/**
 * Updates the identifier (name) of a initial variable.
 */
export function setInitialVariableIdentifier(
    state: ProgramInfo,
    action: PayloadAction<{ index: number; identifier: string }>
): ProgramInfo {
    return {
        ...state,
        initialVariables: state.initialVariables.map((v, index) =>
            index === action.payload.index
                ? {
                      ...v,
                      identifier: action.payload.identifier,
                  }
                : v
        ),
    };
}
