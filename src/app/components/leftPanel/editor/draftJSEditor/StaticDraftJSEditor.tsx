import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftJSEditor.css';
import { useState } from 'react';
import { WhileDecorator } from './WhileDecorator';
import { blockRenderFunction } from './EditorWrapper';
import { useEffect } from 'react';

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
        <div className="font-monospace">
            <Editor
                editorState={editorState}
                onChange={(editorState) => handleChange(editorState)}
                blockRendererFn={blockRenderFunction}
                handleBeforeInput={() => 'handled'}
            />
        </div>
    );
}
