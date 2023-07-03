import { useQuery, gql, useMutation} from "@apollo/client";


const GET_CUSTOMERS = gql`

    query GetMyCustomer {
        getCustomerByUserId {
            customer {
                id
                name
                userId
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
    return { loading, error, data };

}


  