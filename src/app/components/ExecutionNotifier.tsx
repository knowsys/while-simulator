import { useContext, useEffect } from 'react';
import { ExecutionManagerContext } from '..';
import { createTimeoutEffect } from '../createTimeoutEffect';
import { useAppSelector } from '../store';

export const localStoragePrefix = '6a0477ec-7eb1-4c20-87a9-10a93944c6b9';
export const programTextLocalStorageKey =
    localStoragePrefix + '-v1-programText';
export const uiSettingLocalStorageKey = localStoragePrefix + '-v1-uiSettings';

/**
 * Propagates changes in the editor state and initial variables to the execution manager.
 */
export function ExecutionNotifier() {
    const initialVariables = useAppSelector(
        (store) => store.programInfo.initialVariables
    );
    const editorState = useAppSelector(
        (store) => store.programInfo.editorState
    );

    const executionManager = useContext(ExecutionManagerContext);

    // eslint-disable-next-line
    useEffect(
        createTimeoutEffect(() => {
            executionManager?.handleStoreChange(
                editorState.getCurrentContent().getPlainText(),
                initialVariables
            );
        }, 200),
        [initialVariables, editorState]
    );

    return <></>;
}
