import gql from 'graphql-tag';

export const FRIEND_ALL = gql(`query 
friends($page: Int!)
{
  friends(page: $page)
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

export const FRIEND_REQUEST_ALL = gql(`query 
friendRequests($page: Int!)
{
  friendrequests(page: $page)
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

export const FRIEND_REQUEST_SEND = gql(`mutation($friend_id: ID!)
{
  friendRequest(friend_id: $friend_id)
  {
    id
    friend_id
    {
      id
      name
      lastname
      country
      age
    }
  }
}`)

export const FRIEND_REQUEST_ACCEPT = gql(`mutation($id: ID!)
{
  friendRequestAccept(id: $id)
}`)

// export const FRIEND_DELETE = gql(``)