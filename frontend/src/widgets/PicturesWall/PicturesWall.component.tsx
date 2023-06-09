import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Добавить</div>
    </div>
);

export type PicturesWallProps = {
    setValue?: (files: File[]) => void;
    maxCount: number;
};

const beforeUpload = () => false;

export const PicturesWall: React.FC<PicturesWallProps> = ({ setValue, maxCount }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleValues = async (arr: UploadFile[]) => {
        const res = await Promise.all(
            arr.map(async (file) => new File([(await file.originFileObj?.arrayBuffer()) ?? ''], file.fileName ?? 'file.png'))
        );
        setValue?.(res);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setValue && handleValues(newFileList);
    };

    return (
        <React.Fragment>
            <Upload
                listType="picture-card"
                fileList={fileList}
                multiple
                maxCount={maxCount}
                onPreview={handlePreview}
                accept="image/png, image/jpeg"
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                {fileList.length >= maxCount ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    );
};
