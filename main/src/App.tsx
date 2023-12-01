import { RemoteComponent } from './components/remote-component';
import { RemotesProvider } from './context/remote';
import { loadComponent } from './utils';

function App() {
  const propertyPromise = loadComponent('Widget1', 'http://localhost:9002', './property', 'Property');

  propertyPromise().then((module) => {
    console.log(module.Property);
  });

  return (
    <RemotesProvider>
      <div className="App">
        <RemoteComponent remoteName="Widget" moduleName="app" />
      </div>
    </RemotesProvider>
  );
}

export default App;
