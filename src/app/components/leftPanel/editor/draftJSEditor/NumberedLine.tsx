import { ContentBlock, ContentState, EditorBlock } from 'draft-js';
import './NumberedLine.css';

export interface NumberedLineProps {
    block: ContentBlock;
    contentState: ContentState;
}

export function NumberedLine(props: NumberedLineProps) {
    const { block, contentState } = props;
    const lineNumber =
        contentState
            .getBlockMap()
            .toList()
            .findIndex((item: any) => item.key === block.getKey()) + 1;
    return (
        <div className="numbered-line-container" data-line-number={lineNumber}>
            <div className="numbered-line-text">
                <EditorBlock {...props} />
            </div>
        </div>
    );
}
