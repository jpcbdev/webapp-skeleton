import { apolloClient } from '../apollo-client';
import { gql } from '@apollo/client';

export interface IUser {
    _id: string
    name: string
    role: string
    email: string
    active: boolean
    timezone: string
    username: string
    firstSurname: string
    phone: string
}
export const signing = async (searchCriteria: string, password: string): Promise<any> => {
    const { data } = await apolloClient.mutate({
        mutation: gql`mutation signing($searchCriteria: String!, $password: String!){
                signing(signingInput: {searchCriteria:$searchCriteria, password:$password}) {token} }`,
        variables: { searchCriteria, password },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
    });
    return data?.signing;

}

export const createSale = async (variables: any): Promise<any> => {
    const { data } = await apolloClient.mutate({
        mutation: gql`mutation createSale(
                $draw: ID!
                $date: String
                $numbers: [NumberInput!]!
                $customer: CustomerInput
                $comments: String){
                createSale(createSaleInput: {
                    draw: $draw
                    date: $date
                    numbers: $numbers
                    customer: $customer
                    comments: $comments
                }){
                    content
                }}`,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
    });
    return data?.createSale;
}

export const getUsers = async (): Promise<IUser[]> => {
    const { data } = await apolloClient.query({ query: gql`query getUsers { getUsers { _id name role email active timezone username firstSurname phone deleted} }` });
    return data?.getUsers ?? [];
}

export const createUser = async (variables: object): Promise<any> => {
    const { data } = await apolloClient.mutate({
        mutation: gql`mutation createUser(
                $name: String!
                $firstSurname: String!
                $username: String!
                $email: String!
                $role: String!){
                createUser(createUserInput: {
                    name: $name
                    firstSurname: $firstSurname
                    username: $username
                    email: $email
                    role: $role
                })}`,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
    });
    return data?.createUser;
}

export const deleteUser = async (variables: object): Promise<any> => {
    const { data } = await apolloClient.mutate({
        mutation: gql`mutation deleteUser(
                $_id: ID!){
                deleteUser(deleteUserInput: {
                    _id: $_id
                })}`,
        variables,
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
    });
    return data?.deleteUser;
}

export const getDraws = async (): Promise<any[]> => {
    const { data } = await apolloClient.query({
        query: gql`query getDraws { getDraws {_id name multiplier fromHour{hour, minute} toHour{hour, minute} days concept timezone priority numbersLength {
            min
            max
          }} }`
    });
    return data?.getDraws ?? [];
}