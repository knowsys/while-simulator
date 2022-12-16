import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { App } from './components/App';
import { ExecutionManager } from './execution/ExecutionManager';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { programInfoSlice } from './store/programInfo';
import './i18n/i18n';
import {
    programTextLocalStorageKey,
    uiSettingLocalStorageKey,
} from './components/LocalStorageAutoSaver';
import { uiSettingsSlice } from './store/uiSettings';
import { ExecutionNotifier } from './components/ExecutionNotifier';
import { LocalStorageAutoSaver } from './components/LocalStorageAutoSaver';

const store = createStore();
console.info('[Redux] Created store: ', store);

store.subscribe(() => console.info('[Redux] Store action dispatched'));

const savedProgramText =
    window.localStorage.getItem(programTextLocalStorageKey) || '';
store.dispatch(programInfoSlice.actions.setProgramText(savedProgramText));
const savedUISettings =
    window.localStorage.getItem(uiSettingLocalStorageKey) || undefined;
if (savedUISettings !== undefined) {
    try {
        store.dispatch(
            uiSettingsSlice.actions.setAllUISettings(
                JSON.parse(savedUISettings)
            )
        );
    } catch (error) {
        console.error(
            '[App] Error while loading UI setting from local storage',
            { savedUISettings, error }
        );
    }
}

const executionManager = new ExecutionManager(
    savedProgramText,
    store,
    2000,
    100
);

export const ExecutionManagerContext = React.createContext<
    ExecutionManager | undefined
>(undefined);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ExecutionManagerContext.Provider value={executionManager}>
                <App />
                <ExecutionNotifier />
                <LocalStorageAutoSaver />
            </ExecutionManagerContext.Provider>
        </Provider>
    </React.StrictMode>
);
