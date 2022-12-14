import * as ReactDOM from 'react-dom/client';
// need to import characterInfo component

const App = () => {
  render (
    // characterInfo component goes here
    <div>This is where the character info will go!</div>
  )
}


const root = createRoot(document.getElementByID('app'));
root.render(<App/>);