import gql from 'graphql-tag';

export const MESSAGE_ALL = gql(`query
messages($page: Int!)
{
  messages(page: $page)
  {
    id
    user_id
    {
      id
      name
      lastname
    }
    conversation_id
    message
    created_at
    updated_at
  }
}`)

export const MESSAGE_UPSERT = gql(`mutation($id: ID! $friend_id: ID! $message: String!)
{
  messageUpsert(input: {
    id: $id
    friend_id: $friend_id
    message: $message
  })
  {
    id
    conversation_id
    user_id
    {
      id
      name
      lastname
    }
    message
    created_at
    updated_at
  }
}`)

// export const MESSAGE_DELETE = gql(``)

export const MESSAGE_SUBSCRIPTION = gql(`subscription
MessageUpsert
{
  messageUpsert
  {
    id
    conversation_id
     user_id
     {
       id
       name
       lastname
     }
    message
    created_at
    updated_at
  }
}`)
