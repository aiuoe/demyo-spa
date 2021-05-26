import gql from 'graphql-tag';

export const CONVERSATION_ALL =  gql(`query
conversations($page: Int!)
{
  conversations(page: $page)
  {
    id
    friend_id
    {
      id
      name
      lastname
      photos
      {
        id
        url
      }
    }
  }
}`)

// export const CONVERSATION_UPSERT = gql(``)
// export const CONVERSATION_DELETE = gql(``)

export const CONVERSATION_SUBSCRIPTION = gql(`subscription
ConversationUpsert
{
  conversationUpsert
  {
    id
    friend_id
    {
     id
     name
     lastname
    }
    created_at
    updated_at
  }
}`)