import {default as axios} from "axios";
import {renderCaptcha} from "./rendererCaptchat.ts";

export const get = (
    addFunction: (output: string)=>void,
    remaining: number,
    total: number,
    reload: () => void,
    container: HTMLElement,
    token: string,
) => {
    let needRenderCaptcha = false;
    if (remaining == 0) return false;
    axios.get(import.meta.env.VITE_URL, {headers: {
            'x-aws-waf-token': token
        }})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            addFunction((total-remaining) + ": " + error.message)
            if (error.status === 405) {
                console.log("render")
                needRenderCaptcha = true;
                renderCaptcha(container, import.meta.env.VITE_API_KEY, {
                    onLoad: () => {console.log("load")},
                    onSuccess: () => get(addFunction, remaining - 1, total, reload, container, token),
                    onPuzzleCorrect: () => get(addFunction, remaining - 1, total, reload, container, token),
                })
            }
            // console.error(error)
        })
        .finally(()=> {
            reload();
            if (!needRenderCaptcha)
                get(addFunction, remaining - 1, total, reload, container, token);
        })
    return true;
}