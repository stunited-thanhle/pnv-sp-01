import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { postAssignApi, unAssignAPI } from "../api/AssignApi";

export const useUnassignEmployee = () => {
    
    const queryClient = useQueryClient();
    const useUnassign= async (params) => await unAssignAPI(params)
    const mutation = useMutation(
        useUnassign,
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["EMPLOYEE_PROJECT"]);
                await queryClient.refetchQueries(['PROJECT_DETAIL']);

            },

        },
    );

    return mutation;
};

export const useAssignEmployee = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (params) => postAssignApi(params),
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["EMPLOYEE_PROJECT"]);
                await queryClient.refetchQueries(['PROJECT_DETAIL']);
        },
        }
    );

    return mutation;
};