import './ParserError.css';

export interface ParserErrorProps {
    children: JSX.Element;
}

export function ParserError(props: ParserErrorProps) {
    return (
        <span className="draft-js-editor-parser-error">{props.children}</span>
    );
}
