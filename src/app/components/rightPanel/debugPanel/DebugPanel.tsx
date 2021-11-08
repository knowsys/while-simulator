import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FlowTraceTable } from './flowTraceTable/FlowTraceTable';

export function DebugPanel() {
    const { t } = useTranslation('debugPanel');

    const [isDebugPanelEnabled, setIsDebugPanelEnabled] = useState(false);

    return (
        <Card>
            <Card.Header>
                Debugger
                <span className="text-muted">
                    <Form.Check
                        className="d-inline-block ms-3"
                        type="switch"
                        id="debug-panel-enabled-switch"
                        onChange={(event) => {
                            setIsDebugPanelEnabled(event.target.checked);
                        }}
                    />
                </span>
            </Card.Header>
            {isDebugPanelEnabled ? (
                <Card.Body>
                    <h4>{t('flowTraceTable')}</h4>
                    <FlowTraceTable />
                    {t('description')}
                </Card.Body>
            ) : (
                <></>
            )}
        </Card>
    );
}
