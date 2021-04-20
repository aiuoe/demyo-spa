import gql from 'graphql-tag';

export const USER_ALL = gql(`query 
{
  users
  {
    id
    name
    lastname
    country
    age
    sex
  }
}`)