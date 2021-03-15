import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            //first user
            name: 'Mai',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            //second user
            name: 'Jeanny',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name:'Citrine Bracelet',
            category:'Bracelet',
            image:'/images/citrine.jpg',
            price:25,
            countInStock: 5,
            rating:4.5,
            numReviews: 10,
            description: '8mm Round Bead Citrine Bracelet'
        },
        {
            name:'Beryl Bracelet',
            category:'Bracelet',
            image:'/images/Beryl.jpeg',
            price:28,
            countInStock: 2,
            rating:5,
            numReviews: 8,
            description: '8mm Round Bead Multicolor Beryl Bracelet'
        },
        {
            name:'Tourmaline',
            category:'Bracelet',
            image:'/images/tourmaline.jpg',
            price:21,
            countInStock: 3,
            rating:3.5,
            numReviews: 5,
            description: '8mm Round Bead Multicolor Tourmaline Bracelet'
        },
        {
            name:'Indian Agate Bracelet',
            category:'Bracelet',
            image:'/images/indianAgate.jpg',
            price:12,
            countInStock: 10,
            rating:3,
            numReviews: 7,
            description: '8mm Round Bead Indian Agate Bracelet'
        },
        {
            name:'Labradorite',
            category:'Bracelet',
            image:'/images/labradorite.jpg',
            price:18,
            countInStock: 0,
            rating:4.5,
            numReviews: 15,
            description: '7mm Round Bead Blue Flash Labradorite Bracelet'
        },
        {
            name:'Orange Jade',
            category:'Bracelet',
            image:'/images/orangeJade.jpg',
            price:20,
            countInStock: 4,
            rating:4.5,
            numReviews: 10,
            description: '10mm Round Bead Orange Jade Bracelet'
        },
    ]
}

export default data;