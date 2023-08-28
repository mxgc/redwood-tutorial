// accessed as `senario.comment.jane`, etc
export const standard = defineScenario({
  comment: {
    // name given to the scenario for easier reference in the test
    jane: {
      // data is passed to prisma `db.comment.create` to create the test db
      data: {
        name: 'Jane Doe',
        body: 'I like trees',
        // using nested create syntax
        // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
        post: {
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fix umped over the lazy dog',
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
            body: 'The five boxing wizards jump quickly',
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario({
  post: {
    bark: {
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
      },
    },
  },
})
