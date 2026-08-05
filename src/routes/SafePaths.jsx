import { Navigate, useNavigate } from "react-router";
import { AXIOS } from "../services";

const SafePaths = ({ children }) => {
    const token = sessionStorage.getItem("token") || null;
    const navigate = useNavigate();
    // Add a request interceptor
    AXIOS.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    AXIOS.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            if (error?.response?.status === 401) {
                sessionStorage.clear();
                navigate("/");
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        }
    );
    return token ? children : <Navigate to={"/"} />;
}

export default SafePaths;