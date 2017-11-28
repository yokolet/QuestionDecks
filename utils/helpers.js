export const getDeckEntries = (deck) => {
  const entries = {
    'e4a40b75-34e5-42af-aaed-0353b5e1bfc2': {
      id: 'e4a40b75-34e5-42af-aaed-0353b5e1bfc2',
      name: 'udacicards',
      cards: [
        {
          category: 'React',
          question: 'Does React Native work with Android?',
          answer: true,
        },
        {
          category: 'React',
          question: 'React is a library for mamanging user interfaces',
          answer: true,
        },
        {
          category: 'JavaScript',
          question: 'A closure is a combination of a function in the lexical environment',
          answer: true,
        },
      ],
    },
    '39bd7f09-7f14-47cc-b39d-8a903aa8027c': {
      id: '39bd7f09-7f14-47cc-b39d-8a903aa8027c',
      name: 'new deck',
      cards: [],
    },
    '5fa3277b-7e65-49e7-8ffa-7cf67057fd0d': {
      id: '5fa3277b-7e65-49e7-8ffa-7cf67057fd0d',
      name: 'New deck 2',
      cards: [],
    },
  }

  return typeof deck === 'undefined'
    ? entries
    : entries[deck]
}
