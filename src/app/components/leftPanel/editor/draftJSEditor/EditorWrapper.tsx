import { useAppDispatch, useAppSelector } from '../../../../store';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { programInfoSlice } from '../../../../store/programInfo';
import './DraftJSEditor.css';
import { LineNumbers } from './LineNumbers';

export function EditorWrapper() {
    const dispatch = useAppDispatch();
    const editorState = useAppSelector(
        (state) => state.programInfo.editorState
    );

    return (
        <>
            <span className="editor-wrapper-line-number-container me-1">
                <LineNumbers editorState={editorState} />
            </span>
            <span className="editor-wrapper-editor-container">
                <Editor
                    editorState={editorState}
                    onChange={(editorState) => {
                        dispatch(
                            programInfoSlice.actions.setEditorState(editorState)
                        );
                    }}
                    textDirectionality={'LTR'}
                    autoCapitalize={'off'}
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    spellCheck={false}
                    stripPastedStyles={true}
                    placeholder={'LOOP x1 DO x0 := x0 + x2 END'}
                />
            </span>
        </>
    );
}
