import { DebugPanel } from './debugPanel/DebugPanel';
import { ExecutionPanel } from './executionPanel/ExecutionPanel';

export function RightPanel() {
    return (
        <>
            <ExecutionPanel />
            <br />
            <DebugPanel />
        </>
    );
}
