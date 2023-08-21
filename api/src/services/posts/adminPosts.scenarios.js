export const standard = defineScenario({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            id: 1,
            name: 'Fake User',
            email: 'fake1@fake.com',
            hashedPassword: 'fake',
            salt: 'fake',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          connect: {
            email: 'fake1@fake.com',
          },
        },
      },
    },
    three: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            name: 'Fake User',
            email: 'fake3@fake.com',
            hashedPassword: 'fake',
            salt: 'fake',
          },
        },
      },
    },
  },
})
