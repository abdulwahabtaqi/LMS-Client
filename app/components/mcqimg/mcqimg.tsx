'use client';

import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import uploadMcqsImg from '../../context/server/mcq/uploadMcqsImg';

interface McqimgProps {
    onImageUpload?: (imageUrl: string) => void;
}

const Mcqimg: React.FC<McqimgProps> = ({ onImageUpload }) => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>(['https://res.cloudinary.com/drwdqdqbg/image/upload/v1727465344/mcqs/xcwfrnjcqe0tth1tdxvl.png']);
    const toast = useRef<Toast>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!image) return;

        setLoading(true);
        try {
            const response = await uploadMcqsImg(image);
            if (response?.status) {
                const imageUrl = response?.data?.imageUrl;
                setUploadedImages((prevImages) => [...prevImages, imageUrl]);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: response?.message || 'Image uploaded successfully',
                    life: 3000
                });

                if (onImageUpload && imageUrl) {
                    onImageUpload(imageUrl);
                }
                setShowModal(false);
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: response?.message || 'Failed to upload image',
                    life: 3000
                });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to upload image',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setShowModal(true);
        setImage(undefined);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="media-page">
            <Toast ref={toast} />

            <div className="header-section">
                <h2>Media</h2>
                <Button label="Add Image" icon="pi pi-plus" className="p-button-success" onClick={openModal} />
            </div>

            <div className="image-gallery">{uploadedImages.length > 0 ? uploadedImages.map((img, index) => <img key={index} src={img} alt={`Uploaded ${index}`} className="gallery-image" />) : <p>No images uploaded yet.</p>}</div>

            <Dialog visible={showModal} header="Upload Image" modal onHide={closeModal} style={{ width: '90vw', maxWidth: '600px' }}>
                <div className="upload-container">
                    <label className="custom-file-upload">
                        <input type="file" onChange={handleFileUpload} accept="image/*" />
                        Choose Image
                    </label>
                    {image && <img src={image} alt="Preview" className="image-preview" />}
                    <Button label={loading ? 'Uploading...' : 'Upload Image'} icon="pi pi-upload" onClick={handleSendFile} disabled={loading || !image} className="p-button-primary" />
                </div>
            </Dialog>

            <style jsx>{`
                .media-page {
                    padding: 2rem;
                }

                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .image-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .gallery-image {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    background-color: white;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .upload-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .custom-file-upload {
                    display: inline-block;
                    cursor: pointer;
                    padding: 10px 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f1f1f1;
                    transition: background-color 0.3s ease;
                }

                .custom-file-upload:hover {
                    background-color: #e1e1e1;
                }

                input[type='file'] {
                    display: none;
                }

                .image-preview {
                    width: 100%;
                    max-width: 300px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                button:disabled {
                    background-color: gray;
                }

                @media (max-width: 600px) {
                    .header-section {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </div>
    );
};

export default Mcqimg;
