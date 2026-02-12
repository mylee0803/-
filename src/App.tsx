import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MyCellar from './pages/MyCellar';
import TastingNotes from './pages/TastingNotes';
import Statistics from './pages/Statistics';
import BucketList from './pages/BucketList';
import AddEntry from './pages/AddEntry';
import FontPreview from './pages/FontPreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cellar" element={<MyCellar />} />
          <Route path="notes" element={<TastingNotes />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="bucket-list" element={<BucketList />} />
          <Route path="add" element={<AddEntry />} />
          <Route path="font-preview" element={<FontPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
