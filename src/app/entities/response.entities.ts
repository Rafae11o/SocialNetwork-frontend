export class Response {
    message: string;
    success: boolean; 

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }

}

export class ResponseWithData<T> extends Response {

    data: T;

    constructor(message: string, success: boolean, data: T){
        super(message, success);
        this.data = data;
    }

}

