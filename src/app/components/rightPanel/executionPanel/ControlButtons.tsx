import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ExecutionManagerContext } from '../../..';
import { createTimeoutEffect } from '../../../createTimeoutEffect';
import { useAppSelector } from '../../../store';
import { Icon } from '../../Icon';
import { TextTooltip } from '../../TextTooltip';
import './ControlButtons.css';

export function ControlButtons() {
    const { t } = useTranslation('executionPanel');

    const executor = useAppSelector((state) => state.programInfo.executor);

    const executionManager = useContext(ExecutionManagerContext);

    const [isSpinnerShown, setIsSpinnerShown] = useState(false);

    // eslint-disable-next-line
    useEffect(
        createTimeoutEffect(() => {
            if (isSpinnerShown === true) {
                setIsSpinnerShown(false);
            }
        }, 500),
        [isSpinnerShown]
    );

    return (
        <>
            <ButtonGroup>
                <Button
                    className="control-buttons-fixed-button"
                    variant="primary"
                    onClick={() => {
                        setIsSpinnerShown(true);
                        executionManager?.restartExecutor();
                    }}
                >
                    {isSpinnerShown ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <Icon
                            name={
                                executor.didExecutionFinish
                                    ? 'caret-right-fill'
                                    : 'arrow-repeat'
                            }
                        />
                    )}{' '}
                    {executor.didExecutionFinish
                        ? t('startExecution')
                        : t('restartExecution')}
                </Button>
                <TextTooltip
                    text={t('restartInSingleStepModeTooltip')}
                    tooltipID="control-button-single-step-tooltip"
                    placement="top"
                >
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            executionManager?.restartExecutor(1);
                        }}
                    >
                        <Icon name="bug"></Icon>
                    </Button>
                </TextTooltip>
            </ButtonGroup>{' '}
            {executor.isRunning || executor.didExecutionFinish ? (
                <Button
                    className="control-buttons-fixed-button"
                    variant="danger"
                    onClick={() => {
                        executionManager?.executor?.stop();
                    }}
                    disabled={executor.didExecutionFinish}
                >
                    <Icon name="stop-fill"></Icon> {t('stopExecution')}
                </Button>
            ) : (
                <>
                    <ButtonGroup>
                        <Button
                            className="control-buttons-fixed-button"
                            variant="warning"
                            onClick={() => {
                                executionManager?.executor?.setRemainingSteps(
                                    undefined
                                );
                                executionManager?.executor?.start();
                            }}
                            disabled={executor.didExecutionFinish}
                        >
                            <Icon name="caret-right"></Icon>{' '}
                            {t('continueExecution')}
                        </Button>{' '}
                        {!executor.didExecutionFinish ? (
                            <TextTooltip
                                text={t('singleStepTooltip')}
                                tooltipID="control-button-single-step-tooltip"
                                placement="top"
                            >
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        executionManager?.executor?.setRemainingSteps(
                                            1
                                        );
                                        executionManager?.executor?.start();
                                    }}
                                >
                                    <Icon name="arrow-right-circle"></Icon>
                                </Button>
                            </TextTooltip>
                        ) : undefined}
                    </ButtonGroup>
                </>
            )}{' '}
        </>
    );
}
