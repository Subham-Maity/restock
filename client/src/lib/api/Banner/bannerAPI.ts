import axios from "axios";
import {BASE_URL} from "@/lib/constant/constants";

export const fetchBanner=async()=>{
    let response = await axios.get(`${BASE_URL}/banner`);
    console.log("res",response.data.href);
    return response;
}

// export const putBanner=async()=>{
//     let response = await axios.get(`${BASE_URL}/banner`);
//     console.log("res",response.data.href);
//     return response;
// }

export function putBanner(product: any): Promise<{ data: any }> {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `${BASE_URL}/products/`,
            {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();
        resolve({ data });
    });
}