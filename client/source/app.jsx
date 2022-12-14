import * as ReactDOM from 'react-dom/client';
// need to import characterInfo component

const App = () => {
  return (
    // characterInfo component goes here
    <div>This is where the character info will go!</div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);