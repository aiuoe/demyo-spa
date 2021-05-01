import gql from 'graphql-tag';

export const HOBBY_ALL = gql(`query
{
  hobbies
  {
    id
    name
  }
}`)

export const HOBBY_UPSERT = gql(`mutation ($id: ID $name: String!)
{
  hobbyUpser(id: $id name: $name)
  {
    id
    name
  }
}`)

// export const HOBBY_DELETE = gql(``)

