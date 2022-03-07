import * as React from 'react';
import classNames from "classnames";

interface DraggerProps {
    onFile: (file: FileList) => void
}
const Dragger: React.FC<DraggerProps> = (props) => {
    const { onFile, children } = props;
    const [dragOver, setDragOver] = React.useState(false);
    const klass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    }
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files)
    }
    return (
        <div className={klass} onDragOver={e => { handleDrag(e, true) }} onDragLeave={e => { handleDrag(e, false) }} onDrop={handleDrop}>
            {children}
        </div>
    )
}

export default Dragger;