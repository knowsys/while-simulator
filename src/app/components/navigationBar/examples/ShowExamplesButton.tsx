import { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Examples } from './Examples';

export function ShowExamplesButton() {
    const { t } = useTranslation('navigationBar');

    const [isModalShown, setIsModalShown] = useState(false);

    const hideModal = () => setIsModalShown(false);

    return (
        <>
            <Nav.Link onClick={() => setIsModalShown(true)}>
                {t('examples')}
            </Nav.Link>

            <Modal show={isModalShown} onHide={hideModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t('examples:title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Examples />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        {t('common:closeModal')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
