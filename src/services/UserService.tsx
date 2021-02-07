import axios from "axios";

export class UserService {
    private mainUrl: string = 'https://randomuser.me/';
    private options: any;
    private url: string;

    constructor(url: string = 'api') {
        this.url = url;
        this.options = this.getOptions();
    }

    getOptions() {
        const options = this.setOptions();
        return options;
    }

    setOptions() {
      return {
         headers: {
            'Accept': 'application/json',
         }
       }
     }


    getUserInfo() {
        return axios.get(`${this.mainUrl}/${this.url}`,  this.options);
    }

   

} 

