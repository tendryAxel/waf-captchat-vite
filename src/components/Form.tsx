import {MouseEventHandler, useEffect, useRef, useState} from "react";
import {get} from "../utils.ts";

declare class AwsWafIntegration {
    public static getToken(): Promise<string>;
}

export default () => {
    const [outputs, setOutputs] = useState<string[]>([])
    const [state, setState] = useState<boolean>(true)
    const [numberOfRequest, setNumberOfRequest] = useState<number>(0)
    const ref = useRef<HTMLDivElement | null>(null);

    const addOutput = (name: string): void => {
        setOutputs((prevOutputs) => [...prevOutputs, name])
    }

    const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        AwsWafIntegration.getToken().then(token=>{
            get(addOutput, numberOfRequest, numberOfRequest, ()=>setState(!state), ref.current!, token);
        })
    }

    useEffect(() => {}, [state])

    return (
        <div>
            <input type="number" placeholder="Number of request to send" onChange={e => {
                e.preventDefault()
                setNumberOfRequest(Number(e.target.value))
            }}/>
            <button onClick={onclick}>Send</button>
            <p>The output: </p>
            <div className="out-put">{outputs.map(o => <p>{o}</p>)}</div>

            <div id="captcha_container" ref={ref}></div>
        </div>
    )
}
