export class Authority implements AuthorityInterface{
    public id: number;
    public name: string;
    constructor(authorityCfg: AuthorityInterface)
    {
    this.id = authorityCfg.id;
    this.name = authorityCfg.name;
    }
    
    }
    
    interface AuthorityInterface{
    id?: number;
    name: string;
    }
    