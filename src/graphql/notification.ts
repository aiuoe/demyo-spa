import gql from 'graphql-tag';

export const NOTIFICATION_SUBSCRIPTION = gql(`subscription
NotificationSubscription
{
  notificationSubscription
  {
    id
    message
    user_id
    {
      id
      name
    }
    friend_id
    {
      id
      name
      photos
      {
        url
      }
      gender_id
      {
        id
      }
    }
    created_at
    updated_at
  }
}`)

export const NOTIFICATION_ALL = gql(`query
{
  notifications
  {
    id
    user_id
    {
      id
    }
    friend_id
    {
      id
      photos
      {
        url
      }
      gender_id
      {
        id
      }
    }
    message
    created_at
    updated_at
  }
}`)