export const standard = defineScenario({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
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
          create: {
            name: 'Fake User',
            email: 'fake2@fake.com',
            hashedPassword: 'fake',
            salt: 'fake',
          },
        },
      },
    },
  },
})
