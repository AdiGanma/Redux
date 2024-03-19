import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { useGetUsers } from "../hooks/api/useGetUsers";

const Home = () => {
  const { users } = useSelector((state) => state.users);
  useGetUsers();

  return (
    <div className="container mx-auto mt-20">
      <div className="overflow-x-auto max-w-3xl mx-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Password</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user) => {
              return (
                <Table.Row
                  key={user.id}
                  className="even:bg-green-300 odd:bg-white"
                >
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.password}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Home;
