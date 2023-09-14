export const standard = defineScenario({
  // name of the record type to call `create` on
  comment: {
    // name of the record for easier reference
    jane: {
      // data passed to the `create` function, here `db.comment.create(data: data)`
      data: {
        name: 'Jane Doe',
        body: 'I like trees',
        post: {
          // nested `create` syntax, required field `postId` will be automatically connected with the id of newly created `post` field
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fox jumped over the lazy dog',
            user: {
              create: {
                email: 'email1@email.com',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    john: {
      data: {
        name: 'John Doe',
        body: 'Hug a tree today',
        post: {
          create: {
            title: 'Root Systems',
            body: 'The five boxing wizards jump quickly.',
            user: {
              create: {
                email: 'email2@email.com',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario({
  // db.post.create(data:data)
  post: {
    bark: {
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
        user: {
          create: {
            email: 'bark@email.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },

    bare: {
      data: {
        title: 'Bare',
        body: "A tree's top",
        user: {
          create: {
            email: 'bare@email.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
