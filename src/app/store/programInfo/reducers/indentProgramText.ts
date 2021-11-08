import { PayloadAction } from '@reduxjs/toolkit';
import { EditorState, Modifier } from 'draft-js';
import { ProgramInfo } from '../ProgramInfo';

export function indentProgramText(
    state: ProgramInfo,
    _action: PayloadAction<void>
): ProgramInfo {
    if (!state.editorState.getSelection().isCollapsed()) {
        return state;
    }

    const contentState = Modifier.insertText(
        state.editorState.getCurrentContent(),
        state.editorState.getSelection(),
        '    '
    );

    const editorState = EditorState.push(
        state.editorState,
        contentState,
        'insert-characters'
    );

    return {
        ...state,
        editorState,
    };
}
