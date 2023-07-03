import { useQuery, gql, useMutation } from "@apollo/client";

const GET_CUSTOMERS = gql`
  query FindAllCustomers($findAllCustomersInput: FindAllCustomersInput!) {
  findAllCustomers(findAllCustomersInput: $findAllCustomersInput) {
    customers {
      id
      name
      status
      type
    }
    pagination {
      totalCount
      totalPages
    }
    response {
      status
      message
    }
  }
}
`;

export function useCustomer() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS) || {};
  return{loading, error, data };
}

const CustomerList = () => {
    const [getCustomer,{ loading, error }] = useQuery(GET_CUSTOMERS) || {};

    const {data}=  getCustomer({
        variables: {
            findAllCustomersInput: {
                page: 1,
                limit: 10,
                sort: "name",
                order: "asc",
            },
        },
    });


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const customers = data.findAllCustomers.customers;
  return (
    <div>
      <h1>Customers</h1>
      {/* {customers.map((customer) => (
        <div key={customer.id}>
          <p>Name: {customer.name}</p>
          <p>User ID: {customer.userId}</p>
        </div>
      ))} */}
    </div>
  );
};

export default CustomerList;
