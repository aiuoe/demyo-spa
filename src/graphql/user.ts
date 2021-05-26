import gql from 'graphql-tag';

export const USER_EVERY = gql(`query
{
  users_all
  {
    id
    name
    lastname
    email
    birth_date
    about_me
    gender_id
    {
      id
      name
    }
    relationship_id
    {
      id
      name
    }
    wish_id
    {
      id
      name
    }
    city_id
    {
      id
      name
    }
    created_at
    updated_at
    photos
    {
      id
      url
    }
  }
}`)

export const USER_ALL = gql(`query 
{
  users
  {
    id
    name
    lastname
    birth_date
    about_me
    gender_id
    {
      name
    }
    relationship_id
    {
      name
    }
    wish_id
    {
      name
    }
    city_id
    {
      name
    }
    photos
    {
      id
      url
    }
    created_at
    updated_at
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
  }
}`)

export const ME_ID = gql(`query
{
  me
  {
    id
  }
}`)