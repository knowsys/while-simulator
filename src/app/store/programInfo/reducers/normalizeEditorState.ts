import { PayloadAction } from '@reduxjs/toolkit';
import { programInfoSlice } from '..';
import { ProgramInfo } from '../ProgramInfo';
import { setProgramText } from './setProgramText';

export function normalizeEditorState(
    state: ProgramInfo,
    _action: PayloadAction<void>
): ProgramInfo {
    const programText = state.editorState.getCurrentContent().getPlainText();
    const lineCount = programText.split('\n').length;
    const blockCount = state.editorState
        .getCurrentContent()
        .getBlocksAsArray().length;

    if (blockCount !== lineCount) {
        state = setProgramText(
            state,
            programInfoSlice.actions.setProgramText(programText)
        );
    }

    return state;
}
