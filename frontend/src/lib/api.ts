import API from "../config/apiClient"

export const login = async (data: { email: string, password: string }) => {
    return API.post('/auth/login', data)
}

export const logout = async () => API.get("/auth/logout");

export const register = async (data: { email: string, password: string, confirmPassword: string }) => {
    return API.post('/auth/register', data)
}


// export const verifyEmail = async (verificationCode) =>
//   API.get(`/auth/email/verify/${verificationCode}`);

export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${ verificationCode }`);


export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({ verificationCode, password }: { verificationCode: string, password : string}) =>
  API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/user");

export const getSessions = async () => API.get("/sessions");

export const deleteSession = async (id: string) => API.delete(`/sessions/${id}`);
