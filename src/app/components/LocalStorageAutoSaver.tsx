import { useEffect } from 'react';
import { createTimeoutEffect } from '../createTimeoutEffect';
import { useAppSelector } from '../store';

export const programTextLocalStorageKey = 'v1-programText';
export const uiSettingLocalStorageKey = 'v1-uiSettings';

/**
 * Saves the UI setting and editor state to the local storage.
 */
export function LocalStorageAutoSaver() {
    const uiSettings = useAppSelector((store) => store.uiSettings);
    const editorState = useAppSelector(
        (store) => store.programInfo.editorState
    );

    // eslint-disable-next-line
    useEffect(
        createTimeoutEffect(() => {
            window.localStorage.setItem(
                programTextLocalStorageKey,
                editorState.getCurrentContent().getPlainText()
            );
            window.localStorage.setItem(
                uiSettingLocalStorageKey,
                JSON.stringify(uiSettings)
            );
        }, 500),
        [uiSettings, editorState]
    );

    return <></>;
}
