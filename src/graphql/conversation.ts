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
    }
  }
}`)

// export const CONVERSATION_UPSERT = gql(``)
// export const CONVERSATION_DELETE = gql(``)