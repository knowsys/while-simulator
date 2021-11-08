import { PayloadAction } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';
import { Statement } from '../../../../core/ast/Statement';
import { ProgramInfo } from '../ProgramInfo';
import { addEntity } from './editor/addEntity';
import { removeAllEntities } from './editor/removeAllEntities';

export interface ActiveStatementInformation {
    statement: Statement;
    programText: string;
}

export function setActiveStatement(
    state: ProgramInfo,
    action: PayloadAction<ActiveStatementInformation | null>
): ProgramInfo {
    let editorState = state.editorState;

    let contentState = editorState.getCurrentContent();

    // Remove old parser errors
    contentState = removeAllEntities(contentState);

    if (action.payload !== null && !state.isExecutorOutdated) {
        // Add new active statement
        const { startIndex, endIndex } = action.payload.statement.position;

        contentState = addEntity(
            contentState,
            action.payload.programText,
            state.activeStatementEntityKey,
            startIndex,
            endIndex
        );
    }

    editorState = EditorState.set(editorState, {
        currentContent: contentState,
    });

    return {
        ...state,
        editorState,
    };
}
