const entries = [
  // Es mejor usar UUID para identificar cada entrada
  {
    id: '1', // 123456789
    date: new Date().toDateString(), // Sun Dec 16 2019
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    picture: 'https://picsum.photos/600/600', // 'https://picsum.photos/200/300'
  },
  {
    id: '2', // 123456789
    date: new Date().toDateString(), // Sun Dec 16 2019
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    picture: 'https://random.imagecdn.app/600/600', // 'https://picsum.photos/200/300'
  },
  {
    id: '3', // 123456789
    date: new Date().toDateString(), // Sun Dec 16 2019
    text: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
    picture: 'https://api.lorem.space/image/burger?w=600&h=600', // 'https://picsum.photos/200/300'
  },
]

export default entries
