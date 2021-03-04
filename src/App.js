import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import MainComponent from './Pages/MainComponent/MainComponent';

const client = new ApolloClient({
    uri: 'https://api.graphqlplaceholder.com'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <MainComponent />
        </ApolloProvider>
    );
}

export default App;
