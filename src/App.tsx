import Button, { ButtonType, ButtonSize } from './components/Button/button';
function App() {
  return (
    <div className="App">
      <Button className="custom">hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.large}>hello</Button>
      <Button btnType={ButtonType.Link} href='https://www.baidu.com' target='_blank'>hello</Button>
      <Button btnType={ButtonType.Danger}>hello</Button>
      <Button disabled btnType={ButtonType.Link} href='https//www.baidu.com'>hello</Button>
    </div>
  );
}

export default App;
