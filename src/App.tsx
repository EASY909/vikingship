import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Upload from './components/Upload/upload';
function App() {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file 太大')
      return false
    }
    return true
  }
  const filePromise = (file: File) => {
    const newFile = new File([file], 'newfile.docx', { type: file.type });
    return Promise.resolve(newFile)
  }
  return (
    <div className="App">
      {/* <Button className="custom">hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.large}>hello</Button>
      <Button btnType={ButtonType.Link} href='https://www.baidu.com' target='_blank'>hello</Button>
      <Button btnType={ButtonType.Danger}>hello</Button>
      <Button disabled btnType={ButtonType.Link} href='https//www.baidu.com'>hello</Button> */}
      <Upload action="https://jsonplaceholder.typicode.com/posts/"
        onProgress={() => console.log(11)}
        onChange={() => console.log("change")}
        beforeUpload={filePromise}
        multiple
        drag={true}
      // accept={'.jpg'}
      >
        <Button btnType={ButtonType.Danger}>hello</Button>
      </Upload>
    </div>
  );
}

export default App;
