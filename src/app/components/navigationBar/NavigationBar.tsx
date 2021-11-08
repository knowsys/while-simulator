import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './NavigationBar.css';
import { UISettings } from './UISettings';
import { ShowExamplesButton } from './examples/ShowExamplesButton';
import { useTranslation } from 'react-i18next';

export function NavigationBar() {
    const { t } = useTranslation('navigationBar');

    return (
        <Navbar
            variant="light"
            expand="lg"
            style={{ backgroundColor: '#e3f2fd' }}
        >
            <Container>
                <Navbar.Brand className="me-4">While simulator</Navbar.Brand>
                <Navbar.Toggle aria-controls="navigation-bar-nav" />
                <Navbar.Collapse id="navigation-bar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="https://iccl.inf.tu-dresden.de/web/Theoretische_Informatik_und_Logik"
                            target="_blank"
                        >
                            {t('documentation')}
                        </Nav.Link>
                        <ShowExamplesButton />
                    </Nav>
                    <a href="feedback/" target="_blank">
                        <Button className="me-4" variant="primary">
                            {t('common:giveFeedback')}
                        </Button>
                    </a>
                    <UISettings />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
