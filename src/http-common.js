import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost/api/",
});

const requestHandler = request => {
  // Token will be dynamic so we can use any app-specific way to always   
  // fetch the new token before making the call
  const token = localStorage.getItem('token');
  if(token)
  {
    request.headers.Authorization = 'Bearer '+token;  
  }  
  return request;
};

const responseHandler = response => {
  if (response.status === 401) {
      window.location = '/login';
  }

  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;