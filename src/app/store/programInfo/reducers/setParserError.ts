import { PayloadAction } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';
import { TokenType } from '../../../../core/parser/nearley/tokens';
import { initialProgramInfo } from '../initialProgramInfo';
import { ProgramInfo } from '../ProgramInfo';
import { addEntity } from './editor/addEntity';
import { removeAllEntities } from './editor/removeAllEntities';

export interface ParserErrorInformation {
    unexpectedTokenType: TokenType;
    programText: string;
    startIndex: number;
    endIndex: number;
    expectedTokenTypes: TokenType[];
}

export function setParserError(
    state: ProgramInfo,
    action: PayloadAction<ParserErrorInformation | null>
): ProgramInfo {
    let editorState = state.editorState;

    let contentState = editorState.getCurrentContent();

    // Remove old parser errors
    contentState = removeAllEntities(contentState);

    if (action.payload !== null) {
        // Add new parser error
        contentState = addEntity(
            contentState,
            action.payload.programText,
            state.parserErrorEntityKey,
            action.payload.startIndex,
            action.payload.endIndex
        );
    }

    editorState = EditorState.set(editorState, {
        currentContent: contentState,
    });

    return {
        ...state,
        editorState,
        parserError:
            action.payload === null
                ? initialProgramInfo.parserError
                : {
                      unexpectedTokenType: action.payload.unexpectedTokenType,
                      expectedTokenTypes: action.payload.expectedTokenTypes,
                      unexpectedToken:
                          action.payload.unexpectedTokenType === 'endOfFile'
                              ? ''
                              : action.payload.programText.substring(
                                    action.payload.startIndex,
                                    action.payload.endIndex
                                ),
                  },
    };
}
