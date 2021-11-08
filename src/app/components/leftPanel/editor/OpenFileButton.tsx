import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store';
import { programInfoSlice } from '../../../store/programInfo';
import { Icon } from '../../Icon';

export function OpenFileButton() {
    const { t } = useTranslation('navigationBar');
    const dispatch = useAppDispatch();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const openFile = (file: File) => {
        const reader = new window.FileReader();

        reader.onload = () => {
            if (!reader.result) {
                return;
            }
            dispatch(
                programInfoSlice.actions.setProgramText(
                    reader.result.toString()
                )
            );
        };

        reader.readAsText(file);
    };

    return (
        <Button
            variant="outline-dark"
            size="sm"
            onClick={() => {
                if (fileInputRef.current !== null) {
                    fileInputRef.current.click();
                }
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="d-none"
                onChange={(event) => {
                    const file = (event.target.files || [])[0];
                    if (!file) {
                        return;
                    }
                    openFile(file);
                }}
            />
            <Icon name="file-earmark-text" /> {t('openFile')}
        </Button>
    );
}
