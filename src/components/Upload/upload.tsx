import classNames from "classnames";
// import Button, { ButtonType } from "../Button/button"
import { useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import Dragger from "./dragger";
import UploadFileList from "./upLoadList"
interface IUploadProps {
    action: string
    onProgress?: (precentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    defaultFileList?: UploadFile[];
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export type UploadFileStatus = "ready" | "uploading" | "success" | "error"
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
const Upload: React.FC<IUploadProps> = (props) => {
    const { action, onProgress, onSuccess, onError, beforeUpload, onChange, defaultFileList, onRemove, headers, name = "file", data, withCredentials, accept, multiple, children, drag } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prelist => {
            return prelist.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file;
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) { return }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(progressedFile => {
                        post(progressedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }

        })
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + "upload-file",
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [_file, ...prevList]
        });
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp);
            updateFileList(_file, { status: "success", response: resp });
            if (onSuccess) onSuccess(resp.data, file);
            if (onChange) onChange(file);
        }).catch(err => {
            console.log(err);
            updateFileList(_file, { status: "error", error: err });
            if (onError) onError(err, file)
            if (onChange) onChange(file);
        })
    }
    console.log(fileList);
    return (
        <div className="viking-upload-component">
            {/* <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload file</Button> */}
            <div className="viking-upload-input" style={{ display: "inline-block" }} onClick={handleClick}>
                {drag ? <Dragger onFile={(files) => { uploadFiles(files) }}>{children}</Dragger> : { children }}
                <input
                    className="viking-file-input"
                    style={{ display: "none" }}
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadFileList fileList={fileList} onRemove={() => { }} />


        </div>

    )
}

export default Upload;