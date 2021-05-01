import gql from 'graphql-tag';

export const GENDER_ALL = gql(`query
{
  genders
  {
    id
    name
    created_at
    updated_at
  }
}`)

// export const GENDER_UPSERT = gql(``)
// export const GENDER_DELETE = gql(``)