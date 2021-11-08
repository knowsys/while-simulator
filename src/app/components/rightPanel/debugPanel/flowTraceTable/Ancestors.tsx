import { Assignment } from '../../../../../core/ast/Assignment';
import { Branch } from '../../../../../core/ast/Branch';
import { FiniteLoop } from '../../../../../core/ast/FiniteLoop';
import { Statement } from '../../../../../core/ast/Statement';
import { StatementSequence } from '../../../../../core/ast/StatementSequence';
import { WhileLoop } from '../../../../../core/ast/WhileLoop';
import './Ancestors.css';

export interface AncestorsProps {
    ancestors: Statement[];
}

export const statementColorMap = new Map<any, string>();
statementColorMap.set(Assignment, 'success');
statementColorMap.set(FiniteLoop, 'info');
statementColorMap.set(StatementSequence, 'secondary');
statementColorMap.set(WhileLoop, 'primary');
statementColorMap.set(Branch, 'warning');

export function Ancestors(props: AncestorsProps) {
    return (
        <>
            {props.ancestors
                .filter(
                    (statement) => !(statement instanceof StatementSequence)
                )
                .map((statement, i) => (
                    <span
                        key={i}
                        className={`ancestors-indicator text-${statementColorMap.get(
                            statement.constructor
                        )}`}
                    >
                        ❱
                    </span>
                ))}
        </>
    );
}
