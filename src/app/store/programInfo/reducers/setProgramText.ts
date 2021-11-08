import { PayloadAction } from '@reduxjs/toolkit';
import { ContentState, EditorState } from 'draft-js';
import { ProgramInfo } from '../ProgramInfo';

export function setProgramText(
    state: ProgramInfo,
    action: PayloadAction<string>
): ProgramInfo {
    const editorState = EditorState.createWithContent(
        ContentState.createFromText(action.payload),
        state.editorState.getDecorator()
    );
    return {
        ...state,
        editorState,
    };
}
