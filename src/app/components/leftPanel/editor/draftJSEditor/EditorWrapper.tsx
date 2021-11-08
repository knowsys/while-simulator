import { useAppDispatch, useAppSelector } from '../../../../store';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { NumberedLine } from './NumberedLine';
import { programInfoSlice } from '../../../../store/programInfo';
import './DraftJSEditor.css';

export function blockRenderFunction() {
    return {
        component: NumberedLine,
    };
}

export function EditorWrapper() {
    const dispatch = useAppDispatch();
    const editorState = useAppSelector(
        (state) => state.programInfo.editorState
    );

    return (
        <Editor
            editorState={editorState}
            onChange={(editorState) => {
                dispatch(programInfoSlice.actions.setEditorState(editorState));
            }}
            blockRendererFn={blockRenderFunction}
            textDirectionality={'LTR'}
            autoCapitalize={'off'}
            autoComplete={'off'}
            autoCorrect={'off'}
            spellCheck={false}
            stripPastedStyles={true}
            placeholder={'    LOOP x1 DO x0 := x0 + x2 END'}
        />
    );
}
