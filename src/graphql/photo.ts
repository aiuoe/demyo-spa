import gql from 'graphql-tag';

export const PHOTO_INSERT = gql(`mutation($id: ID $photos: [Upload!])
{
  photoInsert(id: $id photos: $photos )
}`)