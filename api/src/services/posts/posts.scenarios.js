export const standard = defineScenario({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            email: 'one@email.com',
            hashedPassword: 'String',
            salt: 'String',
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
            email: 'two@email.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export const userOnly = defineScenario({
  user: {
    one: {
      data: {
        email: 'bare@email.com',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})
