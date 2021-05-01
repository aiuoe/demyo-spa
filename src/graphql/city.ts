import gql from 'graphql-tag';

export const CITY_ALL = gql(`query
{
  cities
  {
    id
    name
  }
}`)

// export const CITY_UPSERT = gql(``)
// export const CITY_DELETE = gql(``)