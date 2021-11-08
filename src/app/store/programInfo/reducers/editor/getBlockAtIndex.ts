import { ContentState } from 'draft-js';

export function getBlockKeyAtIndex(
    contentState: ContentState,
    programText: string,
    index: number
) {
    const lines = programText.substring(0, index).split('\n');

    const lineNumber = programText.substring(0, index).split('\n').length - 1;
    const blockKey = contentState.getBlocksAsArray()[lineNumber].getKey();

    const offset = lines[lines.length - 1].length;

    return {
        blockKey,
        offset,
    };
}
