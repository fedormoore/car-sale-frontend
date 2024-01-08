import {UrlEnum} from "../constants/urlEnum";

interface OptionsValues {
    url?: string;
    body?: string;
    method?: string;
    params?: any;
}

const x = (options:any) => {
    let test="";
    if (options.params !==undefined){
        test='?' + new URLSearchParams(options.params).toString();
    }
    return test;
}

export async function Request(options: OptionsValues) {
    try {
        const response = await fetch(UrlEnum.Server + UrlEnum.VerApi + options.url + x(options), {
            body: options.body,
            method: options.method,
            headers:  {"Authorization": "", "Content-Type": "application/json"}
        });

        const json = await response.json();

        if (!response.ok) {
            throw (json);
        }

        return {
            isOk: true,
            data: json
        };
    } catch (e: any) {
        return {
            isOk: false,
            data: "json"
        };
    }
}