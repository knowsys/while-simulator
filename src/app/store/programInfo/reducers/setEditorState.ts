import { PayloadAction } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';
import { ProgramInfo } from '../ProgramInfo';

export function setEditorState(
    state: ProgramInfo,
    action: PayloadAction<EditorState>
): ProgramInfo {
    return {
        ...state,
        editorState: action.payload,
    };
}
