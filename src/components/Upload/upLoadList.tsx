import { UploadFile } from './upload';
import Progress from "../Progress/progress";

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
const UploadFileList: React.FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props;
    return (
        <ul className="viking-upload-list">
            {fileList.map(file => {
                return <li className="viking-upload-list-item" key={file.uid}>
                    <span className={`file-name file-name-${file.status}`}>{file.name}</span>
                    {file.status === "uploading" && <Progress
                        percent={file.percent || 0}
                    />}
                </li>
            })}
        </ul>

    )
}

export default UploadFileList;