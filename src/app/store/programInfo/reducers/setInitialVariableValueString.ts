import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramInfo } from '../ProgramInfo';

/**
 * Overwrites a the initial value of a single variable.
 */
export function setInitialVariableValueString(
    state: ProgramInfo,
    action: PayloadAction<{ index: number; valueString: string }>
): ProgramInfo {
    return {
        ...state,
        initialVariables: state.initialVariables.map((v, index) =>
            index === action.payload.index
                ? {
                      ...v,
                      valueString: action.payload.valueString,
                  }
                : v
        ),
    };
}
