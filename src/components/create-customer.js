import React, { useState, useEffect } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      customer {
        id
        name
        organizationId
        status
        pricingLevel
      }
      response {
        status
        message
      }
    }
  }
`;

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

const CreateCustomer = () => {
  const [formState, setFormState] = useState({
    name: "",
    organizationId: "",
    status: "",
    pricingLevel: "",
  });

  const [getCustomers, { data: fetchedCustomers, loading: fetchLoading, error: fetchError }] = useLazyQuery(GET_CUSTOMERS);

  const [createCustomer, { data: createCustomerData }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: () => {
      getCustomers({
        variables: {
          findAllCustomersInput: {
            paginationOptions: { page: 1, limit: 50 },
            organizationId: formState.organizationId,
          },
        },
      });
    },
  });

  useEffect(() => {
    getCustomers({
      variables: {
        findAllCustomersInput: {
          paginationOptions: { page: 1, limit: 50 },
          organizationId: formState.organizationId,
        },
      },
    });
  }, []); // Empty dependency array to run the effect only once on initial render

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCustomer({
        variables: {
          createCustomerInput: {
            customer: {
              name: formState.name,
              organizationId: formState.organizationId,
              status: formState.status,
              pricingLevel: formState.pricingLevel,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Customer name"
          />
          <input
            className="mb2"
            value={formState.organizationId}
            onChange={(e) =>
              setFormState({
                ...formState,
                organizationId: e.target.value,
              })
            }
            type="text"
            placeholder="Organization ID"
          />
          <input
            className="mb2"
            value={formState.status}
            onChange={(e) =>
              setFormState({
                ...formState,
                status: e.target.value,
              })
            }
            type="text"
            placeholder="Status"
          />
          <input
            className="mb2"
            value={formState.pricingLevel}
            onChange={(e) =>
              setFormState({
                ...formState,
                pricingLevel: e.target.value,
              })
            }
            type="text"
            placeholder="Pricing Level"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {fetchLoading && <p>Loading...</p>}
      {fetchError && <p>Error: {fetchError.message}</p>}
      {fetchedCustomers && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {fetchedCustomers.findAllCustomers.customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.status}</td>
                <td>{customer.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateCustomer;
