interface ReadingQuestionImageProps {
    image?: string | null;
    alt: string;
}

export const ReadingQuestionImage = ({ image, alt }: ReadingQuestionImageProps) => {
    if (!image) return null;

    return (
        <div className="flex justify-center mb-4">
            <img
                src={`/assets/images/${image}`}
                alt={alt}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
        </div>
    );
};