import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';

export function CurrentVariables() {
    const { t } = useTranslation('executionPanel');

    const didExecutionFinish = useAppSelector(
        (state) => state.programInfo.executor.didExecutionFinish
    );
    const lastConfigurations = useAppSelector(
        (state) => state.programInfo.executor.lastConfigurations
    );
    const variables =
        lastConfigurations.length === 0
            ? {}
            : lastConfigurations[lastConfigurations.length - 1].variables;

    // Hide table if there are no variables
    if (Object.keys(variables).length === 0) {
        return <></>;
    }

    const sortedVariables = Object.entries(variables).sort(
        ([identifierA], [identifierB]) => identifierA.localeCompare(identifierB)
    );

    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>{t('variableIdentifier')}</th>
                    <th>
                        {didExecutionFinish
                            ? t('finalValue')
                            : t('currentValue')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedVariables.map(([identifier, value], index) => (
                    <tr key={index}>
                        <td>{identifier}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
