import amqp from "amqplib";

const rabbitMQSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "whoisbeto",
  password: "admin13233",
  vhost: "/",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"]
};

const INITIAL_QUEUE = "jobs";
const enterprise = "youtube";
const msgs = [
  {
    name: "Beto",
    surname: "Ramos",
    age: 30,
    email: "whoisbeto@gmail.com",
    phone: "123456789",
    address: "1234 Main St",
    city: "New York",
    state: "NY",
    zip: "12345",
    country: "USA",
    company: "Company Inc",
    job: "Software Engineer",
    salary: 100000,
    currency: "USD",
    date: new Date()
  },
  {
    name: "Beto2",
    surname: "Ramos",
    age: 30,
    email: "whoisbeto@gmail.com",
    phone: "123456789",
    address: "1234 Main St",
    city: "New York",
    state: "NY",
    zip: "12345",
    country: "USA",
    company: "Company Inc",
    job: "Software Engineer",
    salary: 100000,
    currency: "USD",
    date: new Date()
  },
  {
    name: "Beto3",
    surname: "Ramos",
    age: 30,
    email: "whoisbeto@gmail.com",
    phone: "123456789",
    address: "1234 Main St",
    city: "New York",
    state: "NY",
    zip: "12345",
    country: "USA",
    company: "Company Inc",
    job: "Software Engineer",
    salary: 100000,
    currency: "USD",
    date: new Date()
  }
];

const recibe = async (): Promise<void> => {
  try {
    const connection = await amqp.connect(rabbitMQSettings);
    console.log("Connected to RabbitMQ");

    const channel = await connection.createChannel();
    console.log("Channel created");

    await channel.assertQueue(INITIAL_QUEUE);

    console.log(
      "Waiting for messages in %s. To exit press CTRL+C",
      INITIAL_QUEUE,
      "messages from",
      enterprise
    );

    channel.consume(INITIAL_QUEUE, (msg) => {
      let employee = JSON.parse(msg!.content.toString());
      console.log("Received %s", employee.name);
      console.log(employee);

      if (employee.city === "Cancun") {
        channel.ack(msg!);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export { recibe, rabbitMQSettings };
