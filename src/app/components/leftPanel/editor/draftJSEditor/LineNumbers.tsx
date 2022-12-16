import { EditorState } from 'draft-js';
import React from 'react';

interface InnerLineNumbersProps {
    lineCount: number;
}

const InnerLineNumbers = React.memo(function LineNumbers(
    props: InnerLineNumbersProps
) {
    return (
        <>
            {[...Array(props.lineCount)].map(
                (_element, lineNumber) => lineNumber + 1 + '\n'
            )}
        </>
    );
});

export interface LineNumbersProps {
    editorState: EditorState;
}

export const LineNumbers = React.memo(function LineNumbers(
    props: LineNumbersProps
) {
    return (
        <InnerLineNumbers
            lineCount={props.editorState.getCurrentContent().getBlockMap().size}
        />
    );
});
