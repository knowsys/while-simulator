import { createSlice } from '@reduxjs/toolkit';
import { initialProgramInfo } from './initialProgramInfo';
import { addInitialVariable } from './reducers/addInitialVariable';
import { indentProgramText } from './reducers/indentProgramText';
import { normalizeEditorState } from './reducers/normalizeEditorState';
import { removeInitialVariable } from './reducers/removeInititalVariable';
import { setActiveStatement } from './reducers/setActiveStatement';
import { setEditorState } from './reducers/setEditorState';
import { setInitialVariableIdentifier } from './reducers/setInitialVariableIdentifier';
import { setInitialVariableValueString } from './reducers/setInitialVariableValueString';
import { setIsExecutorOutdated } from './reducers/setIsExecutorOutdated';
import { setExecutor } from './reducers/setExecutor';
import { setParserError } from './reducers/setParserError';
import { setProgramText } from './reducers/setProgramText';

export const programInfoSlice = createSlice({
    name: 'programInfoSlice',
    initialState: initialProgramInfo,
    reducers: {
        setParserError,
        setProgramText,
        setExecutor,
        setEditorState,
        setInitialVariableIdentifier,
        setInitialVariableValueString,
        addInitialVariable,
        removeInitialVariable,
        indentProgramText,
        setActiveStatement,
        normalizeEditorState,
        setIsExecutorOutdated,
    },
});
