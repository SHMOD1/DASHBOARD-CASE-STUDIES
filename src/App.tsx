import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EditorLayout } from './components/editor/EditorLayout';
import { PresentView } from './components/present/PresentView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorLayout />} />
        <Route path="/present" element={<PresentView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
