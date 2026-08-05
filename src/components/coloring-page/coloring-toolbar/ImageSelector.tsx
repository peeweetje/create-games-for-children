import { useTranslation } from 'react-i18next';
import { ImageIcon } from 'lucide-react';
import type { ColoringImageItem } from '../../../helpers/coloringHelpers';

const IMAGES: ColoringImageItem[] = ['snake', 'dragon', 'deer', 'cat', 'duck', 'bear', 'hedgie', 'blank'];

interface ImageSelectorProps {
    currentImage: ColoringImageItem;
    onImageChange: (image: ColoringImageItem) => void;
}

export const ImageSelector = ({ currentImage, onImageChange }: ImageSelectorProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-text-600 mb-2">
                {t('coloring.imagesLabel')}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
                {IMAGES.map(img => (
                    <button
                        key={img}
                        onClick={() => onImageChange(img)}
                        className={`flex flex-col items-center justify-center p-1.5 rounded-lg border-2 transition-all ${
                            currentImage === img ? 'border-primary-500 bg-primary-50' : 'border-surface-200 hover:border-primary-300'
                        }`}
                    >
                        <ImageIcon size={20} className="mb-1 text-text-600" />
                        <span className="text-xs uppercase font-medium text-text-600">
                            {t(`coloring.images.${img}`)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};