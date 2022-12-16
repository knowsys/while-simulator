import { EditorState } from 'draft-js';
import {
    activeStatementEntityType,
    parserErrorEntityType,
    WhileDecorator,
} from '../../components/leftPanel/editor/draftJSEditor/WhileDecorator';
import { ExecutorInfo, ProgramInfo } from './ProgramInfo';

export const initialExecutor: Readonly<ExecutorInfo> = {
    lastConfigurations: [],
    didExecutionFinish: true,
    isRunning: false,
    executionStep: 0,
};

function createInitialProgramInfo(): ProgramInfo {
    let editorState = EditorState.createEmpty(new WhileDecorator());

    // Add parser error entity
    let contentState = editorState.getCurrentContent();
    contentState = contentState.createEntity(
        parserErrorEntityType,
        'MUTABLE',
        {}
    );
    const parserErrorEntityKey = contentState.getLastCreatedEntityKey();
    contentState = contentState.createEntity(
        activeStatementEntityType,
        'MUTABLE',
        {}
    );
    const activeStatementEntityKey = contentState.getLastCreatedEntityKey();

    editorState = EditorState.set(editorState, {
        currentContent: contentState,
    });

    return {
        initialVariables: [
            {
                identifier: 'x0',
                valueString: '0',
            },
            {
                identifier: 'x1',
                valueString: '0',
            },
        ],
        executor: initialExecutor,
        isExecutorOutdated: false,
        editorState,
        activeStatementEntityKey,
        parserErrorEntityKey,
        parserError: {
            unexpectedTokenType: 'error',
            expectedTokenTypes: [],
            unexpectedToken: '',
        },
    };
}

export const initialProgramInfo = createInitialProgramInfo();
