// data here is used to pre-seed the database

export const standard = defineScenario({
  // the name of the model this data is for
  comment: {
    // friendly name given to the senario data that can be referenced in tests
    jane: {
      // contains the actual data in the database
      data: {
        name: 'Jane Doe', // field that corresponds to the schema
        body: 'I like trees', // field that corresponds to the schema
        post: {
          // this will populate
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fox jumped over the lazy dog.',
          },
        }, // here, a `Comment` requires tha it be related to `Post`, using Prisma's nested create syntax
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
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario({
  // the name of the model this data is for
  post: {
    bark: {
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite.",
      },
    },
  },
})
