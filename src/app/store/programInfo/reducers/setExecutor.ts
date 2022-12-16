import { PayloadAction } from '@reduxjs/toolkit';
import { programInfoSlice } from '..';
import { ExecutorInfo, ProgramInfo } from '../ProgramInfo';
import { setActiveStatement } from './setActiveStatement';

export function setExecutor(
    state: ProgramInfo,
    action: PayloadAction<{ executorInfo: ExecutorInfo; programText: string }>
): ProgramInfo {
    const configurations = action.payload.executorInfo.lastConfigurations;

    if (configurations.length !== 0) {
        const statement =
            configurations[configurations.length - 1].lastStatement;
        if (statement !== null && !state.isExecutorOutdated) {
            state = setActiveStatement(
                state,
                programInfoSlice.actions.setActiveStatement({
                    programText: action.payload.programText,
                    statement,
                })
            );
        } else if (statement === null) {
            state = setActiveStatement(
                state,
                programInfoSlice.actions.setActiveStatement(null)
            );
        }
    }
    return {
        ...state,
        executor: action.payload.executorInfo,
    };
}
