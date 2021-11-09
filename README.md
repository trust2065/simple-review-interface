# dot-dev review UI

## Description
Create a simple review interface for customers to send their feedback

## Hoisting
https://dot-dev-review-interface.web.app/

## Install
`yarn`

## Deploy
`yarn run build & firebase deploy`

## Stacks
- React
- Firebase
    - Hoisting
    - FireStore

## Issue list
### Must have
Done
- Investigate and use firebase v9
- Get a list of users
- Product component - product title and image
- Various input components
- ESLint
- Use react context to manage state
- Send results through api
- Use env variable

To do
- Use formmik to validate inputs before send result
- Error inputs handling

### Good to have
To do
- Styling
- Refactor store
- Centralise and improve types
- Make questions generic (can be customised by each store)
- Loading state