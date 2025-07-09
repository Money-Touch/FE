import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/common/globalStyle';
import router from './routes/router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
