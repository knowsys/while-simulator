import { Table } from 'react-bootstrap';
import { convertOrderedVariables } from '../../../../convertOrderedVariables';
import { useAppSelector } from '../../../../store';
import { Ancestors } from './Ancestors';
import './FlowTraceTable.css';

export function FlowTraceTable() {
    const executionStep = useAppSelector(
        (state) => state.programInfo.executor.executionStep
    );
    const configurations = useAppSelector(
        (state) => state.programInfo.executor.lastConfigurations
    );
    const orderedInitialVariables = useAppSelector(
        (state) => state.programInfo.initialVariables
    );

    if (configurations.length === 0) {
        return <></>;
    }

    const lastConfiguration = configurations[configurations.length - 1];
    const identifiers = Object.keys(lastConfiguration.variables);

    const initialVariables = convertOrderedVariables(orderedInitialVariables);

    return (
        <Table className="flow-trace-table" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    {identifiers.map((identifier) => (
                        <th key={identifier}>{identifier}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {configurations.map((configuration, i) => (
                    <tr
                        key={i}
                        className={
                            configuration.lastStatement ? '' : 'text-muted'
                        }
                    >
                        <td>
                            {configuration.lastStatement ? (
                                <Ancestors
                                    ancestors={configuration.lastStatement?.getAncestors()}
                                />
                            ) : (
                                <>⇨</>
                            )}
                            <span className="float-end">
                                {executionStep - (configurations.length - i)}
                            </span>
                        </td>
                        {identifiers.map((identifier) => (
                            <td key={identifier}>
                                {configuration.lastStatement
                                    ? configuration.variables[identifier]
                                    : initialVariables[identifier]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
