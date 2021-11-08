import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';
import { programInfoSlice } from '../../../store/programInfo';
import { Icon } from '../../Icon';

export function InitialVariables() {
    const { t } = useTranslation('executionPanel');

    const dispatch = useAppDispatch();
    const initialVariables = useAppSelector(
        (state) => state.programInfo.initialVariables
    );

    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>{t('variableIdentifier')}</th>
                    <th>{t('initialValue')}</th>
                </tr>
            </thead>
            <tbody>
                {initialVariables.map((initialVariable, index) => (
                    <tr key={index}>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    value={initialVariable.identifier}
                                    onChange={(event) => {
                                        const identifier =
                                            event.target.value.replace(
                                                /[^\p{L}0-9]+/u,
                                                ''
                                            );
                                        dispatch(
                                            programInfoSlice.actions.setInitialVariableIdentifier(
                                                {
                                                    index,
                                                    identifier,
                                                }
                                            )
                                        );
                                    }}
                                />
                                <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => {
                                        dispatch(
                                            programInfoSlice.actions.removeInitialVariable(
                                                index
                                            )
                                        );
                                    }}
                                >
                                    <Icon name="trash"></Icon>
                                </Button>
                            </InputGroup>
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                size="sm"
                                value={initialVariable.valueString}
                                onChange={(event) => {
                                    const valueString =
                                        event.target.value.replace(
                                            /[^0-9]+/,
                                            ''
                                        );
                                    dispatch(
                                        programInfoSlice.actions.setInitialVariableValueString(
                                            {
                                                index: index,
                                                valueString,
                                            }
                                        )
                                    );
                                }}
                            />
                        </td>
                    </tr>
                ))}
                <tr className="text-muted">
                    <td colSpan={2}>
                        {t('initialValuesSetToZero')}
                        <Button
                            className="float-end"
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => {
                                dispatch(
                                    programInfoSlice.actions.addInitialVariable()
                                );
                            }}
                        >
                            <Icon name="plus-square-dotted"></Icon>{' '}
                            {t('addVariable')}
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
