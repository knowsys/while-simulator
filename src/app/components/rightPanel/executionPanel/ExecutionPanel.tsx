import { Badge, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { Icon } from '../../Icon';
import { TextTooltip } from '../../TextTooltip';
import { ControlButtons } from './ControlButtons';
import { CurrentVariables } from './CurrentVariables';
import './ExecutionPanel.css';
import { InitialVariables } from './InitialVariables';

export function ExecutionPanel() {
    const { t } = useTranslation('executionPanel');

    const executor = useAppSelector((state) => state.programInfo.executor);

    return (
        <Card>
            <Card.Header>
                {t('cardTitle')}
                <span className="float-end">
                    <TextTooltip
                        tooltipID="main-execution-panel-help-tooltip"
                        text={t('panelExplanation')}
                    >
                        <span>
                            <Icon name="question-circle-fill" />
                        </span>
                    </TextTooltip>
                </span>
            </Card.Header>
            <Card.Body>
                <div className="main-execution-panel-table-container">
                    <h3>{t('inputValuesHeading')}</h3>
                    <InitialVariables />
                    <h3>{t('executionHeading')}</h3>
                    <ControlButtons />
                    <br />
                    <br />
                    <p>
                        {t('currentExecutionStep') + ' '}
                        <b>#{executor.executionStep - 1}</b>
                    </p>
                    <p>
                        {t('executionStatus')}:{' '}
                        {executor.didExecutionFinish ? (
                            <Badge bg="success">
                                {t('executionFinishedRunning')}
                            </Badge>
                        ) : executor.isRunning ? (
                            <Badge bg="primary">
                                {t('executionIsRunning')}
                            </Badge>
                        ) : (
                            <Badge bg="warning" text="dark">
                                {t('executionIsPaused')}
                            </Badge>
                        )}{' '}
                    </p>
                    <CurrentVariables />
                </div>
            </Card.Body>
        </Card>
    );
}
