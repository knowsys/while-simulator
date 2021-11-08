import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { Icon } from '../../Icon';

export function DownloadFileButton() {
    const { t } = useTranslation('navigationBar');
    const editorState = useAppSelector(
        (state) => state.programInfo.editorState
    );

    const anchorRef = useRef<HTMLAnchorElement | null>(null);

    return (
        <Button
            variant="outline-dark"
            size="sm"
            onClick={() => {
                if (anchorRef.current === null) {
                    return;
                }

                const programText = editorState
                    .getCurrentContent()
                    .getPlainText();

                anchorRef.current.href = window.URL.createObjectURL(
                    new Blob([programText], { type: 'text/plain' })
                );
                anchorRef.current.download = 'program.while';
                anchorRef.current.click();
            }}
        >
            {/* eslint-disable-next-line */}
            <a ref={anchorRef} className="d-none" />
            <Icon name="file-earmark-arrow-down" /> {t('downloadFile')}
        </Button>
    );
}
