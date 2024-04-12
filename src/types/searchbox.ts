interface DataFilter {
    //mock chat type
    //must back to charge to corecting chat type 
    id?: number;
    name: string;
    cuisine?: string;
    rating?: number;
    roomid?:string;
    img?:string;
    msg?:string;
    time?:string;

    //restaurant type
    ID?: any;
    address?: string;
    description?: string;
    telephone?: string;
    openTime?: string;
    closeTime?: string;
    imageUrl?: string;
    instagram?: string;
    facebook?: string;
    email?: string;

    //any type... if you want searchbox work but add ? all type eiei
  }

export default DataFilter