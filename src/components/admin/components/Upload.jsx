import React, { useState } from "react";
import { Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ImageUploader = () => {
    const [fileList, setFileList] = useState([]);
    const [base64Image, setBase64Image] = useState("");

    const beforeUpload = async (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
            return Upload.LIST_IGNORE;
        }

        const base64 = await getBase64(file);
        setBase64Image(base64);

        // Set thumbUrl for preview
        const newFile = {
            ...file,
            thumbUrl: base64,
        };

        setFileList([newFile]);
        return false; // Prevent automatic upload
    };

    const handleRemove = () => {
        setFileList([]);
        setBase64Image("");
    };

    return (
        <div style={{ padding: 20 }}>
            <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
                showUploadList={{ showPreviewIcon: false }}
            >
                {fileList.length >= 1 ? null : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>

            {base64Image && (
                <div style={{ marginTop: 20 }}>
                    <Image
                        src={base64Image}
                        alt="Uploaded"
                        width={200}
                        style={{ display: "block", marginBottom: 10 }}
                    />
                    <textarea
                        value={base64Image}
                        readOnly
                        style={{ width: "100%", height: 150 }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
