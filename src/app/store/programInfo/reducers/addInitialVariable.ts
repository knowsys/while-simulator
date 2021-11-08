import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramInfo } from '../ProgramInfo';

/**
 * Adds a new initial variable with value zero.
 */
export function addInitialVariable(
    state: ProgramInfo,
    _action: PayloadAction<void>
): ProgramInfo {
    const initialVariableIdentifiers = state.initialVariables.map(
        (variable) => variable.identifier
    );

    let unusedIndex = 0;
    while (initialVariableIdentifiers.includes('x' + unusedIndex)) {
        unusedIndex++;
    }

    return {
        ...state,
        initialVariables: state.initialVariables.concat([
            {
                identifier: 'x' + unusedIndex,
                valueString: '0',
            },
        ]),
    };
}
