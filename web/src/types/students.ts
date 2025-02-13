export interface IStudentsProps {
    name: string;
    onFinish: (data: any) => any;
    loading: boolean;
    disabled: boolean;
    data?: IStudentsData;
    action: IAction
}

export interface IStudentsData {
    firstName: string;
    lastName: string;
}

type IAction = "create" | "update"
