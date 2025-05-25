
type WaitOption = {
    shouldErr?: boolean;
    returnValue?: any;
}

export function wait(duration: number, option: WaitOption = {shouldErr: false, returnValue: null}) {
    const time = Math.abs(duration) * 1000;

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

            if (option.shouldErr) {
                reject(option.returnValue);
            }else {

                resolve(option.returnValue);
            }
        }, time);
    })
}