import { Container, Row, Col } from 'react-bootstrap';
import { NavigationBar } from './navigationBar/NavigationBar';
import { useAppSelector } from '../store';
import { RightPanel } from './rightPanel/RightPanel';
import { LeftPanel } from './leftPanel/LeftPanel';
import { Footer } from './footer/Footer';

export function App() {
    const uiSettings = useAppSelector((state) => state.uiSettings);

    const panelWidth =
        uiSettings.showLeftPanel && uiSettings.showRightPanel ? 6 : 12;

    return (
        <>
            <NavigationBar />
            <Container fluid={uiSettings.enableFullscreen}>
                <br />
                <Row>
                    {uiSettings.showLeftPanel ? (
                        <Col sm={panelWidth}>
                            <LeftPanel />
                        </Col>
                    ) : (
                        <></>
                    )}
                    {uiSettings.showRightPanel ? (
                        <Col sm={panelWidth}>
                            <RightPanel />
                        </Col>
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
            <br />
            <Footer></Footer>
        </>
    );
}
