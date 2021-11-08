import './Examples.css';
import { useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StaticDraftJSEditor } from '../../leftPanel/editor/draftJSEditor/StaticDraftJSEditor';

const examples = [
    {
        name: 'syntax',
        programText:
            '# Assigning a value to a variable\nx1 := 5\n\n# Addition\nx2 := x1 + 3\n# Subtraction\nx3 := x3 - 1\n\n# Finite loops\nLOOP x3 DO\n    # This loop will terminate\n    x3 := x3 + 1\nEND\n\n# While loops\n# Only supports != 0\nWHILE x1 != 0 DO\n    x1 := x1 - 1\nEND\n\n# Shorthand branches\nIF x2 != 0 THEN\n    x2 := x2 + 5\nEND',
    },
    {
        name: 'multiplication',
        programText:
            '# Multiply x1 by x2 and store the result in x0\nLOOP x1 DO\n    LOOP x2 DO\n        x0 := x0 + 1\n    END\nEND\n\nx0 := 0\n# Alternatively use the shorthand-syntax\nLOOP x1 DO\n    x0 := x0 + x2\nEND',
    },
];

export function Examples() {
    const { t } = useTranslation('examples');

    const [selectedExample, selectExample] = useState(0);

    return (
        <Row>
            <Col>
                <p className="text-muted">{t('introduction')}</p>
                <ListGroup>
                    {examples.map((example, i) => (
                        <ListGroup.Item
                            key={i}
                            action
                            active={i === selectedExample}
                            onClick={() => {
                                selectExample(i);
                            }}
                        >
                            {t('names.' + example.name)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col>
                <div className="examples-editor-container">
                    <StaticDraftJSEditor
                        programText={examples[selectedExample].programText}
                    />
                </div>
            </Col>
        </Row>
    );
}
