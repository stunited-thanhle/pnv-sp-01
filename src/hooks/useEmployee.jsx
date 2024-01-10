import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addEmployeeApi,
    deleteEmployeeApi,
    getAllEmployee,
    getDetailEmployee, getManager, getTotalEmployee,
    updateEmployeeApi
} from "../api/EmployeeApi.js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


export const useGetAllEmployee = () => {
    return useQuery({
        queryKey: ["EMPLOYEE"],
        queryFn: async () => {
            try {
                const { data } = await getAllEmployee();
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        },
    });
};



export const useGetDetailEmployee = (id) => {
    return useQuery({
        queryKey: ["EMPLOYEE", id],
        queryFn: async () => {
            try {
                const { data } = await getDetailEmployee(id);
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
    });
};

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(
        (newEmployee) => addEmployeeApi(newEmployee),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["EMPLOYEE"]);
                navigate("/listemployee")

            },

        },
    );

    return mutation;
};

export const useUpdateEmployee = (id) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (params) => updateEmployeeApi(id, params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['EMPLOYEE']);
            },
        }
    );

    return mutation;
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate()
    const deleteEmployee = async (employeeId) => await deleteEmployeeApi(employeeId)

    return useMutation(deleteEmployee, {
        onSuccess: (data) => {
            const check = data.data.message=='Employee deletion successful'
            if(check){
                Swal.fire({
                    title: 'Success',
                    text: data.data.message,
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                })
                navigate('/listemployee')
            }
            else{
                Swal.fire({
                    title: 'Error',
                    text: data.data.message,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false
                }) 
            }
        },
    });
};
export const useGetManager = () => {

    return useQuery(["MANAGER"], async () => {
        const { data } = await getManager();
        return data;
    });
};

export const useGetEmployeeTotal = (params) =>
    useQuery(["EMPLOYEE_TOTAL", params.period], async () => {
        const { data } = await getTotalEmployee(params);
        return data;
    });

