import { CookieStorageUtil } from '@/shared/utils';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
    headers: { 'Authorization': `${CookieStorageUtil.getToken()}` },
});
