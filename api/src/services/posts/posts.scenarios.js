export const standard = defineScenario({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            email: 'mod@mod.com',
            hashedPassword: 'String',
            salt: 'String',
          },
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
          email: 'admin@admin.com',
          hashedPassword: 'String',
          salt: 'String',
        },
      },
    },
  },
})
