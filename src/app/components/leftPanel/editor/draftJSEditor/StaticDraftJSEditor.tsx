import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftJSEditor.css';
import { useState } from 'react';
import { WhileDecorator } from './WhileDecorator';
import { useEffect } from 'react';
import { LineNumbers } from './LineNumbers';

export interface StaticDraftJSEditorProps {
    programText: string;
}

export function StaticDraftJSEditor(props: StaticDraftJSEditorProps) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(
                ContentState.createFromText(props.programText),
                new WhileDecorator()
            )
        );
    }, [props.programText]);

    const handleChange = (editorState: EditorState) => {
        if (
            editorState.getCurrentContent().getPlainText() === props.programText
        ) {
            setEditorState(editorState);
        }
    };

    return (
        <div className="position-relative">
            <span className="editor-wrapper-line-number-container me-1">
                <LineNumbers editorState={editorState} />
            </span>
            <span className="editor-wrapper-editor-container">
                <Editor
                    editorState={editorState}
                    onChange={(editorState) => handleChange(editorState)}
                    handleBeforeInput={() => 'handled'}
                    textDirectionality={'LTR'}
                    autoCapitalize={'off'}
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    spellCheck={false}
                    stripPastedStyles={true}
                    placeholder={'LOOP x1 DO x0 := x0 + x2 END'}
                />
            </span>
        </div>
    );
}
