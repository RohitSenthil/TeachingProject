import TopBar from './components/TopBar';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ProblemPage from './pages/ProblemPage';
import "./App.css"
import HomePage from './pages/HomePage';
import Error404Page from './pages/Error404Page';
import VariableInstructionPage from './pages/VariableInstructionPage';
import ConditionalInstructionPage from './pages/ConditionalInstructionPage';
import LoopInstructionPage from './pages/LoopInstructionPage';
import { GlobalStateProvider } from './components/GlobalStateProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './data/Theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <GlobalStateProvider>
          <BrowserRouter>
            <div className='contain'>
              <TopBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/variable" element={<VariableInstructionPage />} />
                <Route path="/variable/1" element={<ProblemPage problem="variable1" />} />
                <Route path="/variable/2" element={<ProblemPage problem="variable2" />} />
                <Route path="/variable/3" element={<ProblemPage problem="variable3" />} />
                <Route path="/conditional" element={<ConditionalInstructionPage />} />
                <Route path="/conditional/1" element={<ProblemPage problem="conditional1" />} />
                <Route path="/conditional/2" element={<ProblemPage problem="conditional2" />} />
                <Route path="/conditional/3" element={<ProblemPage problem="conditional3" />} />
                <Route path="/loop" element={<LoopInstructionPage />} />
                <Route path="/loop/1" element={<ProblemPage problem="loop1" />} />
                <Route path="/loop/2" element={<ProblemPage problem="loop2" />} />
                <Route path="/loop/3" element={<ProblemPage problem="loop3" />} />
                <Route path="*" element={<Error404Page />} />
              </Routes>
            </div>
          </BrowserRouter>
        </GlobalStateProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;