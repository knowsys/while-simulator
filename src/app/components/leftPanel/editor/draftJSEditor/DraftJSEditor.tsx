import { useAppDispatch, useAppSelector } from '../../../../store';
import 'draft-js/dist/Draft.css';
import './DraftJSEditor.css';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../Icon';
import { EditorWrapper } from './EditorWrapper';
import { uiSettingsSlice } from '../../../../store/uiSettings';
import { programInfoSlice } from '../../../../store/programInfo';
import { OpenFileButton } from '../OpenFileButton';
import { DownloadFileButton } from '../DownloadFileButton';

export function DraftJSEditor() {
    const { t } = useTranslation('editor');

    const dispatch = useAppDispatch();
    const isRightPanelShown = useAppSelector(
        (state) => state.uiSettings.showRightPanel
    );

    return (
        <Card>
            <Card.Header>
                <span className="align-middle me-2">{t('codeEditor')}</span>{' '}
                <OpenFileButton /> <DownloadFileButton />
                {!isRightPanelShown ? (
                    <Button
                        className="float-end"
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                            dispatch(
                                uiSettingsSlice.actions.toggleRightPanel()
                            );
                        }}
                    >
                        <Icon name="caret-right-fill"></Icon>
                        {t('runProgram')}
                    </Button>
                ) : undefined}
            </Card.Header>
            <Card.Body
                className="draft-js-editor-card-body font-monospace"
                onKeyDown={(event: any) => {
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        dispatch(programInfoSlice.actions.indentProgramText());
                    }
                }}
            >
                <EditorWrapper />
            </Card.Body>
        </Card>
    );
}
