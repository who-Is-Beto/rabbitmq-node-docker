import amqp from 'amqplib';

const rabbitMQSettings = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'whoisbeto',
  password: 'admin13233',
  vhost: '/',
  authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
}

const INITIAL_QUEUE = 'jobs';
const msgs = [
  {
    name: 'Beto',
    surname: 'Ramos',
    age: 30,
    email: 'whoisbeto@gmail.com',
    phone: '123456789',
    address: '1234 Main St',
    city: 'New York',
    state: 'NY',
    zip: '12345',
    country: 'USA',
    company: 'Company Inc',
    job: 'Software Engineer',
    salary: 100000,
    currency: 'USD',
    date: new Date()
  },
  {
    name: 'Beto2',
    surname: 'Ramos',
    age: 30,
    email: 'whoisbeto@gmail.com',
    phone: '123456789',
    address: '1234 Main St',
    city: 'New York',
    state: 'NY',
    zip: '12345',
    country: 'USA',
    company: 'Company Inc',
    job: 'Software Engineer',
    salary: 100000,
    currency: 'USD',
    date: new Date()
  },
  {
    name: 'Beto3',
    surname: 'Ramos',
    age: 30,
    email: 'whoisbeto@gmail.com',
    phone: '123456789',
    address: '1234 Main St',
    city: 'New York',
    state: 'NY',
    zip: '12345',
    country: 'USA',
    company: 'Company Inc',
    job: 'Software Engineer',
    salary: 100000,
    currency: 'USD',
    date: new Date()
  }
]

const connect = async (): Promise<void> => {

  try {
    const connection = await amqp.connect(rabbitMQSettings);
    console.log('Connected to RabbitMQ');

    const channel = await connection.createChannel();
    console.log('Channel created');

    const queue = await channel.assertQueue(INITIAL_QUEUE);

    msgs.forEach((msg) => {
      channel.sendToQueue(INITIAL_QUEUE, Buffer.from(JSON.stringify(msg)));
      console.log(`Message sent: ${msg}`);
    });

  } catch (error) {
    console.error(error);
  }
};
export { connect, rabbitMQSettings };

