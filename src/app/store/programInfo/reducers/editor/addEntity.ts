import { ContentState, Modifier, SelectionState } from 'draft-js';
import { getBlockKeyAtIndex } from './getBlockAtIndex';

/**
 * Adds a entity to a given range of the program text
 *
 * @param programText Program text which is required to calculate the draft-js blocks at the given indexes
 */
export function addEntity(
    contentState: ContentState,
    programText: string,
    entityKey: string,
    startIndex: number,
    endIndex: number
) {
    // Mark text with corresponding entity key
    // Get text blocks at start and end index
    const start = getBlockKeyAtIndex(contentState, programText, startIndex);
    const end = getBlockKeyAtIndex(contentState, programText, endIndex);

    // Create draft-js selection
    let selection = SelectionState.createEmpty(
        contentState.getFirstBlock().getKey()
    );
    selection = selection.merge({
        anchorKey: start.blockKey,
        anchorOffset: start.offset,
        focusKey: end.blockKey,
        focusOffset: end.offset,
    });

    // Add entity to selection
    contentState = Modifier.applyEntity(contentState, selection, entityKey);

    return contentState;
}
