import { Variables } from '../core/interpreter/Configuration';
import { OrderedVariables } from './store/programInfo/ProgramInfo';

/**
 * Computes a variable object from a ordered list of variables
 */
export function convertOrderedVariables(orderedVariables: OrderedVariables) {
    const variables: Variables = Object.fromEntries(
        orderedVariables.map((variable) => [
            variable.identifier,
            parseInt('0' + variable.valueString),
        ])
    );
    return variables;
}
