import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card'; // Import Card component
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import getMcqsImgs from '../../context/server/mcq/getMcqsImgs';
import { Toast as ToastType } from 'primereact/toast';
import deleteMcqsImg from '../../context/server/mcq/deleteMcqsImg';

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const toastRef = React.useRef<ToastType>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await getMcqsImgs();
                console.log('result', result.result.data);
                setImages(result.result.data);
            } catch (err) {
                setError('Failed to fetch images');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const copyToClipboard = (url: string) => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toastRef.current?.show({ severity: 'success', summary: 'Copied!', detail: 'URL copied to clipboard.', life: 3000 });
            })
            .catch((err) => {
                console.error('Failed to copy URL:', err);
                toastRef.current?.show({ severity: 'error', summary: 'Error!', detail: 'Failed to copy URL.', life: 3000 });
            });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMcqsImg(id);
            setImages((prevImages) => prevImages.filter((img) => img.id !== id));
            toastRef.current?.show({ severity: 'success', summary: 'Deleted!', detail: 'Image deleted successfully.', life: 3000 });
        } catch (err) {
            console.error('Error deleting image:', err);
            toastRef.current?.show({ severity: 'error', summary: 'Error!', detail: 'Failed to delete image.', life: 3000 });
        }
    };

    if (loading) return <p className="text-center">Loading images...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div>
            <Toast ref={toastRef} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {images?.length > 0 ? (
                    images.map((img, index) => (
                        <Card key={index} className="p-m h-64">
                            <div className="flex mx-auto">
                                <img src={img?.urls[0]} alt={`Uploaded ${index}`} width={100} height={100} className="mx-auto object-cover mb-2" />
                            </div>
                            <div className="w-full flex flex-col h-full justify-between">
                                <div className="flex gap-5 text-sm justify-between mt-2 mb-2">
                                    <Button label="Delete" icon="pi pi-trash" onClick={() => handleDelete(img.id)} className="p-button-sm p-button-danger" style={{ minWidth: '80px' }} />
                                    <Button
                                        label="Copy URL"
                                        icon="pi pi-copy"
                                        onClick={() => copyToClipboard(img.urls[0])}
                                        className="p-button-sm "
                                        style={{ minWidth: '80px' }} //
                                    />
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-center">No images uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;
