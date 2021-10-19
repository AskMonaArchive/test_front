import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme/';
import './theme/baseline.css';
import MuseumList from 'components/MuseumList';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1280px;
  margin: auto;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  background: white;
  height: 100vh
  flex-direction: column;
  white-space: pre-line;
  padding: 5px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box>
          <MuseumList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
