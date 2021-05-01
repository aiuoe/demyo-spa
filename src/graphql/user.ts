import gql from 'graphql-tag';

export const USER_ALL = gql(`query 
{
  users
  {
    id
    name
    lastname
  }
}`)

export const USER_UPDATE = gql(`mutation ($id: ID!, $birth_date: Date!, $about_me: String!, $gender_id: ID!, $relationship_id: ID!, $wish_id: ID!, $city_id: ID!)
{
  userUpdate(input: {
    id: $id
    birth_date: $birth_date
    about_me: $about_me
    gender_id: $gender_id
    relationship_id: $relationship_id
    wish_id: $wish_id
    city_id: $city_id
  })
  {
    id
    name
    lastname
    email
    birth_date
    about_me
    gender_id
    relationship_id
    wish_id
    city_id
    created_at
    updated_at
  }
}`)