import { ContentState, Modifier, SelectionState } from 'draft-js';

/**
 * Removes all occurrences of any entity
 */
export function removeAllEntities(contentState: ContentState) {
    let selection = SelectionState.createEmpty(
        contentState.getFirstBlock().getKey()
    );
    selection = selection.merge({
        anchorKey: contentState.getFirstBlock().getKey(),
        anchorOffset: 0,
        focusKey: contentState.getLastBlock().getKey(),
        focusOffset: contentState.getLastBlock().getLength(),
    });
    return Modifier.applyEntity(contentState, selection, null);
}
