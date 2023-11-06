import Axios from "./Axios";


export const userLogin = (frmData: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Axios.post('/api/user/login', frmData);

            resolve(res.data);

            if (res.data.status === "success") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                    "crmSite",
                    JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};